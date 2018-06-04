import React, { Component } from 'react';
import './ReserveMovieDetail.css';
import ShowChair from "../../common/showChair/ShowChair";
import ReservePay from "../reservePay/ReservePay";
import Calendar from 'react-calendar';


class ReserveMovieDetail extends Component {
    schedule = [
        {id:1, name: '제 1 상영관', time: '3:00 ~ 4:00'},
        {id:1, name: '제 2 상영관', time: '4:00 ~ 5:00'},
        {id:1, name: '제 3 상영관', time: '6:00 ~ 7:00'},
        {id:1, name: '제 4 상영관', time: '8:00 ~ 9:00'}
    ]
    state = {selectedChair: [], step: 1, date: new Date(), calendarShow: false}
    onChairClick = (chair) => {
        const selectedChair = [...this.state.selectedChair];
        const index = selectedChair.findIndex((c) => c.name ===  chair.name);
        if(index === -1) {
            selectedChair.push(chair);
            this.setState({selectedChair: selectedChair}, () => console.log(this.state));
        } else {
            this.setState({selectedChair: selectedChair.filter((c) => c.name !== chair.name)});
        }
    }
    goToPayPage = () => {
        this.setState({step: 2});
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
        this.setState({date: date, calendarShow: false})
    };
    render() {
        const selectedChair = this.state.selectedChair.sort((c1, c2) => {
            if(c1.name > c2.name)
                return 1;
            else if(c1.name < c2.name){
                return -1;
            }
            else
                return 0;
        })
        const selectDay = this.changeToKoreanDate(this.state.date);
        return (

            <div>
                <div>
                    <h2 className={'reserveMovie-d-title'}>
                        {this.state.step === 1 && '영화 예매'}
                        {this.state.step === 2 && '결제'}
                    </h2>
                        <button onClick={this.closeModal} className={'reserve-close-button'}>X</button>
                </div>
                {this.state.step === 1 &&
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
                            <select>
                                <option value={1}>KJC지점</option>
                            </select>
                        </div>
                         <div className={'reserve-content reserve-schedule'}>
                                <div className={'content-name'}>상영일정</div>
                                <div className={'content-body'}>
                                    {this.schedule.map((schedule) => {
                                        return (
                                            <div className={'schedule-one'}>
                                                <div className={'schedule-name'}>
                                                    {schedule.name}
                                                </div>
                                                <div className={'schedule-time'}>
                                                    {schedule.time}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                         <div className={'reserve-content reserve-chair'}>
                             <div className={'content-name'}>좌석 선택</div>
                             <div className={'content-body'}>
                             <ShowChair roomId={1} onChairClick = {this.onChairClick} selectedChair = {this.state.selectedChair}/>
                             </div>
                         </div>
                        <div className={'reserve-content reserve-information'}>
                            <div className={'content-name'}>예매 상세</div>
                            <div className={'content-body'}>
                                <div className={'reserve-movie-image'}>
                                    이미지
                                </div>
                                    <div className={'reserve-information-content'}>
                                    <div>영화 이름</div>
                                    <div>상영관: 1층 제 1 상영관</div>
                                    <div>상영일: </div>
                                    <div>영화 시작시간: </div>
                                    <div>영화 종료시간: </div>
                                    <div>선택 좌석:
                                        {selectedChair.map((c) => {
                                            return (
                                                <span className={'selected-chair'}>
                                                        {c.name}
                                                    </span>
                                            )
                                        })}
                                    </div>
                                    <div> 총 가격: </div>
                                </div>
                            </div>
                        </div>
                         <div className={'to-pay-step'}>
                                <button onClick={this.goToPayPage}>결제하기</button>
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

export default ReserveMovieDetail;