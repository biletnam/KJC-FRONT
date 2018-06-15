import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {checkLogin} from "../../reducers/loginUtil";
import {withRouter} from 'react-router-dom';
import * as loginAction from 'reducers/user/login';
import * as ticket from 'reducers/ticket';
import ReactTable from 'react-table';
import './ReserveInfo.css';
class ReserveInfo extends Component {
    componentWillMount() {
        const {history} = this.props;
        checkLogin()
            .catch((error) => {
                    history.push('/');
                }
            )

    }
    componentDidMount() {
        console.log('mount');
        const {LoginActions, TicketActions} = this.props;
        console.log(LoginActions);
        LoginActions.getLoginUserInformation();
        TicketActions.getTicketOf();
    }
    refund = (ticketData) => {
        const {TicketActions} = this.props;
        const TCK_ID = ticketData.TCK_ID;
        const refundAvailableTime = new Date();
        refundAvailableTime.setMinutes(refundAvailableTime.getMinutes() - 3);
        const ticketStartDate = new Date(ticketData.PL_START_TIME);
        if( ticketStartDate.getTime() - refundAvailableTime.getTime() < 0) {
            alert('영화 시작 3분전 까지만 환불 가능합니다.');
            return;
        }
        if(ticketData.TCK_STATUS !== 'P') {
            alert('결제 완료 상태일 때만 환불이 가능합니다.');
            return;
        }
        TicketActions.refundTicket(TCK_ID)
            .then((data) =>
            {
                TicketActions.getTicketOf()
                alert('성공');
            })
            .catch((error) => {
                console.log(error);
                alert('실패하였습니다.');
            })
        console.log(ticketData);
    }
    ticketing = (ticketData) => {
        const {TicketActions} = this.props;
        const TCK_ID = ticketData.TCK_ID;
        if(ticketData.TCK_STATUS !== 'P') {
            alert('결제 완료 상태일 때만 발권이 가능합니다.');
            return;
        }
        TicketActions.ticketing(TCK_ID)
            .then((data) =>
            {
                TicketActions.getTicketOf();
                alert('성공');
            })
            .catch((error) => {
                console.log(error);
                alert('실패하였습니다.');
            });
    }
    render() {
        const {userInformation} = this.props;
        console.log(userInformation);
        const data = this.props.ticket.data.ticket;
        return (
            <React.Fragment>
                <div className={'reserve-information-title'}>예매 정보</div>
                 <div className={'reserve-information-parent-div'}>
                    <div className={'reserve-information-body'}>
                          <ReactTable
                              data={data}
                              columns={[
                                  {
                                      Header: '영화 이름',
                                      accessor: 'MOVIE_NAME'
                                  },
                                  {
                                      Header: '상영 종류',
                                      accessor: 'PT_NAME'
                                  },
                                  {
                                      Header: '좌석',
                                      accessor: 'SEAT_NAME'
                                  },
                                  {
                                      Header: '시작 시간',
                                      accessor: 'PL_START_TIME',
                                      Cell: (object) => (<div>{object.value ? object.value.split('T')[0] : ''} - {object.value ? object.value.split('T')[1]: ''}</div>)
                                  },
                                  {
                                      Header: '종료 시간',
                                      accessor: 'PL_END_TIME',
                                      Cell: (object) => (<div>{object.value ? object.value.split('T')[0]: ''} - {object.value ? object.value.split('T')[1]:''}</div>)
                                  },
                                  {
                                      Header:'지점',
                                      accessor: 'BRCH_NAME'
                                  },
                                  {
                                      Header: '상영관',
                                      accessor: 'CINEMA_NO',
                                      Cell: (object) => (<div>{object.value} 상영관</div>)
                                  },
                                  {
                                      Header: '티켓 상태',
                                      accessor: 'TCK_STATUS',
                                      Cell: (object) => (
                                          <div>
                                              {object.value === 'P' && '결제 완료'}
                                              {object.value === 'R' && '환불 완료'}
                                              {object.value === 'U' && '무효화'}
                                              {object.value === 'T' && '발권 완료'}
                                          </div>
                                      )
                                  },
                                  {
                                      Header:'발권',
                                      Cell: (object) => {
                                          const isTicketAble = object.original && object.original.TCK_STATUS === 'P';
                                          return ( isTicketAble &&
                                              <div>
                                              <button onClick={() => this.ticketing(object.original)}>발권</button>
                                          </div>
                                          )
                                      }
                                  },
                                  {
                                      Header: '환불',
                                      Cell: (object) => {
                                          const isRefundable = object.original && object.original.TCK_STATUS === 'P';
                                       return ( isRefundable && <div>
                                            <button onClick={() => this.refund(object.original)}>환불하기</button>
                                          </div>)
                                      }
                                  }
                              ]}
                              defaultPageSize={10}
                              className="-striped -highlight"/>
                        <br />
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
export default withRouter(connect((state) => ({isLogin: state.login.login, userInformation: state.login.userInformation, ticket: state.ticket}),(dispatch) => ({
    LoginActions: bindActionCreators(loginAction,dispatch),
    TicketActions: bindActionCreators(ticket, dispatch)
}))(ReserveInfo));