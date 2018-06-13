import React, { Component } from 'react';
import './ReserveMovieDetail.css';
import ShowChair from "../../common/showChair/ShowChair";
import ReservePay from "../reservePay/ReservePay";
import Calendar from 'react-calendar';
import {serverUrl} from "../../../reducers/urlUtil";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as schedule from 'reducers/schedule';
import Loader from 'react-loader-spinner'
import {toISOString} from "../../../reducers/commonUtil";
import * as bookSeat from "reducers/bookSeat";
import * as ticket from "reducers/ticket";
import ReserveSeatShow from "./reserveSeatShow/ReserveSeatShow";

class ReserveMovieDetail extends Component {
    schedule = [];
    state = {selectedChair: [], schedule: [], selectedSchedule: null, branchId: -1, step: 1, date: new Date(), calendarShow: false}
    onChairClick = (chair) => {
        const selectedChair = [...this.state.selectedChair];
        const index = selectedChair.findIndex((c) => c.SEAT_NAME ===  chair.SEAT_NAME);
        if(index === -1) {
            if(selectedChair.length >= 10) {
                alert('최대 10개까지 예매 가능합니다.');
                return false;
            }
            if(chair.TCK_ID) {
                alert('이미 예매된 자석입니다.');
                return false;
            }
            selectedChair.push(chair);
            this.setState({selectedChair: selectedChair}, () => console.log(this.state));
        } else {
            this.setState({selectedChair: selectedChair.filter((c) => c.SEAT_NAME !== chair.SEAT_NAME)});
        }
    }
    goToPayPage = () => {
        const selectedSchedule = this.state.selectedSchedule;
        const selectedChair = this.state.selectedChair;

        if(!selectedSchedule || (!selectedChair || selectedChair.length ===0)) {
            alert('예매하실 좌석을 선택해주세요!');
            return false;
        }
        const {TicketActions} = this.props;

        TicketActions.postTicket({selectedSchedule: selectedSchedule, selectedChair: selectedChair})
            .then((data) => console.log(data))
            .catch((error)=> console.log(error));
        //this.setState({step: 2});
    }
    closeModal = () => {
        const { onCloseModal } = this.props;
        onCloseModal();
    }
    changeToKoreanDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const d = date.getDate();
        return year + '년 ' + month + '월 ' + d +'일';
    }
    onCalendarToggleButtonClick = () => {
        this.setState({calendarShow: !this.state.calendarShow});
    }
    onCalendarChange = (date) =>  {
        const today = new Date();
        today.setHours(0,0,0,0);
        if(date.getTime() < today.getTime()) {
            alert('예매는 금일 부터 가능합니다.');
            return false;
        }

        const maxDate = new Date();
        maxDate.setHours(0,0,0,0);
        maxDate.setDate(today.getDate() + 7);
        if(date.getTime() > maxDate.getTime()) {
            alert('예매는 7일 이내로 가능합니다.');
            return false;
        }
        this.setState({date: date, calendarShow: false}, () => {
            this.getThatDateSchedule();
        })
    };
    onBranchChange = (event) => {
        const id = event.target.value;
        this.setState({branchId: id}, () => {
            this.getThatDateSchedule();
        });
    }
    componentDidMount() {
        const {ScheduleActions, selectedMovie} = this.props;
        const today = new Date();
        today.setHours(0,0,0,0);
        const maxDate = new Date();
        maxDate.setHours(0,0,0,0);
        maxDate.setDate(today.getDate() + 7);

        const todayString = (today.toISOString().split('T')[0]).replace(/-/g, '');
        const maxDayString = (maxDate.toISOString().split('T')[0]).replace(/-/g, '');

        ScheduleActions.getMovieScheduleBetweenDate(selectedMovie.MOVIE_ID, todayString, maxDayString);
    }
    getThatDateSchedule = () => {
        const date = this.state.date;
        const branchId = this.state.branchId;

        const dateString = toISOString(date, '-');
        const filteredSchedule = this.schedule.filter((s) => {
            return s.SCHED_DATE === dateString && s.BRCH_ID === Number(branchId)
        }).sort((s1, s2) => {
            return new Date(s1.PL_START_TIME).getTime() - new Date(s2.PL_START_TIME).getTime()
        }).map((s) => {
            return {...s, PL_START_TIME: (s.PL_START_TIME.split('T')[1]), PL_END_TIME: (s.PL_END_TIME.split('T')[1])}
        })
        this.setState({schedule: filteredSchedule, selectedSchedule: null, selectedChair: []}, () => console.log(this.state));
    }
    scheduleClick = (schedule) => {
        if(this.state.selectedSchedule && schedule.SCHED_ID === this.state.selectedSchedule.SCHED_ID) {
            this.setState({selectedSchedule: null, selectedChair: []})
        } else {
            this.setState({ selectedSchedule: schedule}, () => {this.loadSeat(this.state.selectedSchedule.SCHED_ID)});
        }
    }
    loadSeat = (SCHED_ID) => {
        const {BookSeatActions} = this.props;
        BookSeatActions.getBookSeatsByScheduleId(SCHED_ID);
    }
    sortChairBySeatName = (s1, s2) => {
        if(s1.SEAT_NAME > s2.SEAT_NAME)
            return 1;
        else if(s1.SEAT_NAME < s2.SEAT_NAME){
            return -1;
        }
        else
            return 0;
    }
    bookPriceReducer = (prev, bookSeat) => {
        return prev + Number(bookSeat.BOOK_PRICE);
    }
    render() {
        const {selectedMovie, branch, bookSeat} = this.props;
        const seats = this.state.selectedSchedule ? bookSeat.data.bookSeat: [];
        const selectedChair = this.state.selectedChair.sort(this.sortChairBySeatName);
        const selectedChairPrice = this.state.selectedChair.reduce(this.bookPriceReducer, 0);
        this.schedule = this.props.schedule.data.schedule;
        const selectDay = this.changeToKoreanDate(this.state.date);
        const branches = [{BRCH_ID: -1, BRCH_NAME: '선택 안됨'}, ...branch];
        const schedulePending = this.props.schedule.pending;
        const bookSeatPending = this.props.bookSeat.pending;
        const ticketPostPending = this.props.ticket.postPending;
        const date = this.state.date;
        const koreanDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() +'일';
        const startTime = this.state.selectedSchedule ? (this.state.selectedSchedule.PL_START_TIME): '';
        const endTime = this.state.selectedSchedule ? (this.state.selectedSchedule.PL_END_TIME) : '';
        return (
            <div>
                <div>
                    <h2 className={'reserveMovie-d-title'}>
                        {this.state.step === 1 && '영화 예매'}
                        {this.state.step === 2 && '결제'}
                    </h2>
                        <button onClick={this.closeModal} className={'reserve-close-button'}>X</button>
                </div>
                {this.state.step === 1 && schedulePending &&
                    <div className={'loading'}>
                             <Loader
                                 type="Circles"
                                 color="crimson"
                                 height="100"
                                 width="100"
                             />
                    </div>
                }
                {this.state.step === 1 && !schedulePending && this.schedule.length === 0 &&
                    <div>상영 일정이 없습니다.</div>}
                {this.state.step === 1 && !schedulePending && this.schedule.length !== 0 &&
                <div className={'reserve-content-parent'}>
                        <div className={'calendarChild'}>
                            <button className={'calendarButton'} onClick={this.onCalendarToggleButtonClick}>날짜 선택</button>
                            <div className={'viewDate'}>{selectDay}</div>
                            <div className={'realCalendarDiv'} style = {{display: !this.state.calendarShow && 'none'}}>
                                <Calendar value={this.state.date} onChange={this.onCalendarChange}/>
                            </div>
                        </div>
                        <div className={'reserve-content'}>
                            <div className={'reserve-spot-title'}>지점 선택</div>
                            <select values = {this.state.branchId} onChange={this.onBranchChange}>
                                {branches.map((b) => {
                                    return (<option value={b.BRCH_ID}>{b.BRCH_NAME}</option>)
                                })}
                            </select>
                        </div>
                         <div className={'reserve-content reserve-schedule'}>
                                <div className={'content-name'}>상영일정</div>
                                <div className={'content-body'}>
                                    {this.state.schedule.map((schedule) => {
                                        return (
                                            <div className={`schedule-one ${this.state.selectedSchedule && this.state.selectedSchedule.SCHED_ID === schedule.SCHED_ID && 'selectedSchedule'}`}
                                                 key={schedule.SCHED_ID} onClick={() => this.scheduleClick(schedule)}>
                                                <div className={'schedule-name'}>
                                                    {schedule.CINEMA_NO} 상영관 {schedule.SCHED_NO} 회차
                                                </div>
                                                <div className={'schedule-time'}>
                                                    {schedule.PL_START_TIME} ~ {schedule.PL_END_TIME}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {bookSeatPending &&
                                <div className={'loading'}>
                                        <Loader
                                            type="Circles"
                                            color="crimson"
                                            height="100"
                                            width="100"
                                        />
                                </div>
                            }
                             {seats.length > 1 && !bookSeatPending &&
                                 <div className={'reserve-content reserve-chair'}>
                                 <div className={'content-name'}>좌석 선택</div>
                                 <div className={'content-body content-seat-body'}>
                                     <div>*좌석마다 다소 가격 차이가 있을 수 있습니다.</div>
                                     <ReserveSeatShow seats={seats} onChairClick = {this.onChairClick} selectedChair = {this.state.selectedChair}/>
                                     </div>
                                 </div>
                             }
                        <div className={'reserve-content reserve-information'}>
                            <div className={'content-name'}>예매 상세</div>
                            <div className={'content-body'}>
                                <div className={'reserve-movie-image'}>
                                    <img src={serverUrl + '/' + selectedMovie.MOVIE_IMG}/>
                                </div>
                                    <div className={'reserve-information-content'}>
                                    <div>영화 이름: {selectedMovie.MOVIE_NAME}</div>
                                    <div>상영관: {this.state.selectedSchedule ? this.state.selectedSchedule.CINEMA_NO + ' 상영관' : ''}</div>
                                    <div>상영일: {koreanDate}</div>
                                    <div>영화 시작시간: {startTime}</div>
                                    <div>영화 종료시간: {endTime}</div>
                                    <div>선택 좌석:
                                        {selectedChair.map((s) => {
                                            return (
                                                <span className={'selected-chair'}>
                                                        {s.SEAT_NAME}
                                                    </span>
                                            )
                                        })}
                                    </div>
                                    <div> 총 가격: {selectedChairPrice}</div>
                                </div>
                            </div>
                        </div>
                         <div className={'to-pay-step'}>
                             {!ticketPostPending && <button onClick={this.goToPayPage}>결제하기</button>}
                             {ticketPostPending && <div className={'loading'}>
                                        <Loader
                                            type="Circles"
                                            color="crimson"
                                            height="100"
                                            width="100"
                                        />
                                </div>}
                         </div>
                    </div>
                        }
                {
                    this.state.step === 2 &&

                    <div className={'reserve-pay-parent'}>
                        <ReservePay/>
                    </div>
                }
            </div>
        );
    }
}

export default connect((state) => ({schedule: state.schedule, bookSeat: state.bookSeat, ticket: state.ticket}), (dispatch) => ({
    ScheduleActions: bindActionCreators(schedule, dispatch),
    BookSeatActions: bindActionCreators(bookSeat, dispatch),
    TicketActions: bindActionCreators(ticket, dispatch)
}))(ReserveMovieDetail);