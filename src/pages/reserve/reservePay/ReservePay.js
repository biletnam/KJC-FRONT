import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './ReservePay.css';
import ReserveMovieDetail from "../rserveMovieDetail/ReserveMovieDetail";

class ReservePay extends Component {
    state = {
        usePoint: false
    }

    checkBoxChange = (event) => {
        this.setState({usePoint: event.target.checked}, () => console.log(this.state));
    }
    render() {
        return (
            <React.Fragment>
            <div className={'reserve-pay-parent-div'}>
                <div className={'reserve-pay-discount-div'}>
                    <div className={'discount-div-title'}>STEP1. 할인 선택</div>
                    <div className={'discount-way-first'}>
                         <select>
                            <option value={1}>커플 할인</option>
                            <option value={2}>커플 할인</option>
                            <option value={3}>커플 할인</option>
                            <option value={4}>커플 할인</option>
                        </select>
                    </div>
                </div>
                <div className={'reserve-pay-way-div'}>
                    <div className={'pay-way-title'}> STEP2. 결제 방법 선택</div>
                    <div className={'pay-way-first'}>
                        <select>
                            <option value={1}>카드 결제</option>
                            <option value={2}>포인트 결제</option>
                        </select>
                    </div>
                    <div className={'pay-way-second'}>
                        <select>
                            <option value={1}>신한 은행</option>
                            <option value={2}>기업 은행</option>
                        </select>
                    </div>
                </div>
               <div className={'reserve-point-div'}>
                    <div className={'reserve-point-title'}>포인트 사용 <input type={'checkbox'} defaultChecked={this.state.usePoint} onChange={this.checkBoxChange}/></div>
                   {this.state.usePoint &&
                   <div className={'reserve-point-first'}>
                        <div>
                            남은 포인트: 10000
                        </div>
                        <div>
                            포인트 사용:
                            <input id={'pointInput'}/>
                        </div>
                    </div>
                   }
                </div>
            </div>
                <div className={'reserve-pay-total'}>
                    <div className={'reserve-pay-total-title'}>STEP03. 결제 금액 확인</div>
                    <div>
                         <div className={'total-pay-content'}>
                            <span>총 가격</span>
                            <span>10000원</span>
                        </div>
                        <div className={'total-pay-content'}>
                            <span>할인 금액</span>
                            <span>0원</span>
                        </div>
                        <div className={'total-pay-content'}>
                            <span>포인트 사용 금액</span>
                            <span>10원</span>
                        </div>
                        <div className={'total-pay-content'}>
                            <span>결제 금액</span>
                            <span>10000원</span>
                        </div>
                    </div>
                </div>
                <div className={'total-pay-button-div'}>
                    <button>결제</button>
                </div>
            </React.Fragment>
        );
    }
}
export default ReservePay;