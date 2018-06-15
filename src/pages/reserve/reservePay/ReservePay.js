import React, {Component} from 'react';
import './ReservePay.css';
import {serverUrl} from "../../../reducers/urlUtil";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as payMethod from 'reducers/payMethod';
import * as discount from 'reducers/discount';
import * as payHistory from 'reducers/payHistory';
import * as ticket from 'reducers/ticket';
import * as login from "reducers/user/login";
import Loader from 'react-loader-spinner'

class ReservePay extends Component {
    ticketId = -1;
    state = {
        discountId: -1,
        usePoint: false,
        payMethod: null,
        discount: null,
        payCLId: -1,
        payDETId: -1,
        point: 0,
        payInfo: {price: 0, discountPrice: 0, usePoint: 0, payAmount: 0}
    }
    checkBoxChange = (event) => {
        this.setState({usePoint: event.target.checked}, () => this.calculateTicketPrice());
    }
    discountSelectChange = (event) => {
        const DISC_CODE = event.target.value;
        if (Number(DISC_CODE) === -1) {
            this.setState({discountId: -1, discount: null}, () => this.calculateTicketPrice());
        } else {
            const discount = this.props.discount.data.discount;
            const dObject = discount.filter((d) => d.DISC_CODE === Number(DISC_CODE))[0];
            this.setState({discountId: DISC_CODE, discount: dObject}, () => this.calculateTicketPrice());
        }
    }
    payClassifySelectChange = (event) => {
        const PAY_CL_CODE = event.target.value;
        if (Number(PAY_CL_CODE) === -1) {
            this.setState({payCLId: PAY_CL_CODE, payMethod: null, payDETId: -1});
        } else {
            const payMethod = this.props.payMethod.data.payMethod;
            const pObject = payMethod.filter((p) => p.PAY_CL_CODE === Number(PAY_CL_CODE))[0];
            console.log(pObject);
            this.setState({payCLId: PAY_CL_CODE, payMethod: pObject, payDETId: -1});
        }
    }
    payDetailSelectChange = (event) => {
        const PAY_DET_CODE = event.target.value;
        if(this.state.payMethod) {
            const payMethod = this.state.payMethod;
            const payDetails = payMethod.PAY_DETAIL.filter((detail) => detail.PAY_DET_CODE === Number(PAY_DET_CODE));
            if(payDetails.length > 0) {
                const pd = payDetails[0];
                let pointAllUse = false;
                if(pd.PAY_MODULE_NAME.indexOf('포인트') !== -1) {
                    pointAllUse = true;
                }
                console.log(pd.PAY_MODULE_NAME);
                this.setState({payDETId: PAY_DET_CODE, pointAllUse: pointAllUse}, () => {
                    this.calculateTicketPrice();
                });
            }
        }
    }

    componentDidMount() {
        const {PayMethodActions, DiscountActions, TicketActions, LoginActions, ticketId} = this.props;
        PayMethodActions.getPayMethod();
        DiscountActions.getDiscount();
        TicketActions.getTicketById(ticketId);
        LoginActions.getLoginUserInformation();
    }

    calculateTicketPrice = () => {
        const tickets = this.props.ticket.data.ticket;
        if (tickets.length === 0) {
            return false;
        }
        const ticket = tickets[0];
        const price = ticket.TCK_PRICE;
        const discountPrice = this.calculateDiscountPrice(price);
        let usePoint = this.state.usePoint ? this.state.point : 0;
        if(this.state.pointAllUse) {
            usePoint = price-discountPrice;
        }
        const payAmount = price - discountPrice - Number(usePoint);
        this.setState({
            payInfo: {
                price: price,
                discountPrice: discountPrice,
                usePoint: usePoint,
                payAmount: payAmount
            }
        });
    }
    onSubmit = () => {
        const {PayHistoryActions, closeModal, login} = this.props;
        const tickets = this.props.ticket.data.ticket;
        if (tickets.length === 0) {
            return false;
        }
        const ticket = tickets[0];
        const data = {
            TCK_ID: ticket.TCK_ID,
            PAY_DET_CODE: this.state.payDETId,
            PAY_CL_CODE: this.state.payCLId,
            DISC_CODE: this.state.discountId,
            POINT_PAY: this.state.point
        };
        if (data.DISC_CODE === -1) {
            delete data.DISC_CODE;
        }
        if (!data.POINT_PAY) {
            data.POINT_PAY = 0;
        }
        const loginInfo = this.props.login.userInformation;
        if(this.state.pointAllUse && loginInfo.IS_USER !== 'Y') {
            alert('회원만 포인트 결제가 가능합니다.');
            return false;
        }else if(this.state.pointAllUse && loginInfo.IS_USER === 'Y') {
            data.POINT_PAY = this.state.payInfo.usePoint;
            if(loginInfo.POINT < Number(data.POINT_PAY)) {
                alert('회원의 포인트가 부족합니다.');
                return;
            }
        }
        if (!this.validateData(data)) {
            alert('결제 정보를 확인하세요!');
            return false;
        }
        PayHistoryActions.postPayHistory(data)
            .then((data) => {
                alert('성공!');
                closeModal();
            })
            .catch((error) => {
                alert('실패!')
            });

    }

    validateData(data) {
        console.log(data);
        const loginInfo = this.props.login.userInformation;
        if (!data.TCK_ID) {
            console.log('no ticket');
            return false;
        }
        if (!data.PAY_DET_CODE || data.PAY_DET_CODE === -1) {
            console.log('no pay detail');
            return false;
        }
        if (!data.PAY_CL_CODE || data.PAY_CL_CODE === -1) {
            console.log('no pay cl code');
            return false;
        }
        if(loginInfo.IS_USER === 'Y' && loginInfo.POINT < Number(data.POINT_PAY)) {
            console.log('more point then has');
            return false;
        }

        return true;
    }

    calculateDiscountPrice = (price) => {
        const discountMethod = this.state.discount;
        if (!discountMethod) {
            return 0;
        }
        const amount = Number(discountMethod.DISC_AMT);
        if (discountMethod.DISC_METHOD === '%') {
            return Math.floor(price * (amount / 100))
        } else if (discountMethod.DISC_METHOD === '-') {
            return amount;
        }
    }
    onPointChange = (event) => {
        const value = event.target.value;
        this.setState({point: value}, () => this.calculateTicketPrice());
    }

    render() {
        this.ticketId = this.props.ticketId;
        const payCL = [{PAY_CL_CODE: -1, PAY_CL_CODE_NAME: '선택 안됨'}, ...this.props.payMethod.data.payMethod];
        const payMethods = this.state.payMethod ? [...this.state.payMethod.PAY_DETAIL] : [];
        const payDetails = this.state.payMethod ? [{PAY_DET_CODE: -1, PAY_DET_CODE_NAME: '선택 안함'}, ...payMethods] : [];
        const discount = [{DISC_CODE: -1, DISC_NAME: '선택 안됨'}, ...this.props.discount.data.discount];
        const discountPending = this.props.discount.pending;
        const payMethodPending = this.props.payMethod.pending;
        const payHistoryPending = this.props.payHistory.pending;
        const loginInfoPending = this.props.login.getInfoPending;
        const loginInfo = this.props.login.userInformation;
        return (
            <React.Fragment>
                 {!loginInfoPending && !discountPending && !payMethodPending &&
                 <React.Fragment>
                     <div className={'reserve-pay-parent-div'}>
                        <div className={'reserve-pay-discount-div'}>
                            <div className={'discount-div-title'}>STEP1. 할인 선택</div>
                            <div className={'discount-way-first'}>
                                 <select value={this.state.discountId} onChange={this.discountSelectChange}>
                                     {discount.map((d) => (<option value={d.DISC_CODE}>{d.DISC_NAME}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className={'reserve-pay-way-div'}>
                            <div className={'pay-way-title'}> STEP2. 결제 방법 선택</div>
                            <div className={'pay-way-first'}>
                                <select value={this.state.payCLId} onChange={this.payClassifySelectChange}>
                                     {payCL.map((p) => {
                                         return (<option value={p.PAY_CL_CODE}>{p.PAY_CL_CODE_NAME}</option>)
                                     })}
                                </select>
                            </div>
                            <div className={'pay-way-second'}>
                                {this.state.payMethod &&
                                <select value={this.state.payDETId} onChange={this.payDetailSelectChange}>
                                        {payDetails.map((pd) => {
                                            return (<option value={pd.PAY_DET_CODE}>{pd.PAY_DET_CODE_NAME}</option>);
                                        })}
                                    </select>
                                }
                            </div>
                        </div>
                         {loginInfo.IS_USER && loginInfo.IS_USER === 'Y' &&
                             <div className={'reserve-point-div'}>
                                <div className={'reserve-point-title'}>포인트 사용 <input type={'checkbox'}
                                                                                     defaultChecked={this.state.usePoint}
                                                                                     onChange={this.checkBoxChange}/></div>
                                 {this.state.usePoint &&
                                 <div className={'reserve-point-first'}>
                                    <div>
                                        남은 포인트: {loginInfo.POINT}
                                    </div>
                                    <div>
                                        포인트 사용:
                                        <input type='number' id={'point'} value={this.state.point}
                                               max={loginInfo.POINT}
                                               onChange={this.onPointChange}/>
                                    </div>
                                </div>
                                 }
                            </div>
                         }
                    </div>
                     <div className={'reserve-pay-total'}>
                         <div className={'reserve-pay-total-title'}>STEP03. 결제 금액 확인</div>
                         <div>
                             <div className={'total-pay-content'}>
                                 <span>총 가격</span>
                                 <span>{this.state.payInfo.price}원</span>
                             </div>
                             <div className={'total-pay-content'}>
                                 <span>할인 금액</span>
                                 <span>{this.state.payInfo.discountPrice}원</span>
                             </div>
                             <div className={'total-pay-content'}>
                                 <span>포인트 사용 금액</span>
                                 <span>{this.state.payInfo.usePoint}원</span>
                             </div>
                             <div className={'total-pay-content'}>
                                 <span>결제 금액</span>
                                 <span>{this.state.payInfo.payAmount}원</span>
                            </div>
                        </div>
                     </div>
                     <div className={'total-pay-button-div'}>
                     {!payHistoryPending && <button onClick={this.onSubmit}>결제</button>}
                         {payHistoryPending && <div className={'loading'}>
                                        <Loader
                                            type="Circles"
                                            color="crimson"
                                            height="100"
                                            width="100"
                                        />
                                </div>}
                     </div>
                   </React.Fragment>
                 }

            </React.Fragment>
        );
    }
}

export default connect((state) => ({
    payMethod: state.payMethod, discount: state.discount, payHistory: state.payHistory,
    ticket: state.ticket, login: state.login
}), (dispatch) => ({
    PayMethodActions: bindActionCreators(payMethod, dispatch),
    DiscountActions: bindActionCreators(discount, dispatch),
    PayHistoryActions: bindActionCreators(payHistory, dispatch),
    TicketActions: bindActionCreators(ticket, dispatch),
    LoginActions: bindActionCreators(login, dispatch)
}))(ReservePay);