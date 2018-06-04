import React, { Component } from 'react'
import './Reserve.css';
import Calendar from 'react-calendar';
import SelectReserve from "./selectReserve/SelectReserve";
class Reserve extends Component {
    state = {
        calendarShow: false,
        date: new Date(),
    }
    onCalendarToggleButtonClick = () => {
        this.setState({calendarShow: !this.state.calendarShow});
    }
    onCalendarChange = (date) =>  {
        this.setState({date})
    };
    changeToKoreanDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const d = date.getDate();
        return year + '년 ' + month + '월 ' + d +'일';
    }
    render() {
        const selectDay = this.changeToKoreanDate(this.state.date);
        return (
            <div className={'reserveDiv'}>
                <div className="page-title">예매하기</div>
                <div className="reserveParentDiv">
                    <div className="reserveBodyDiv">
                        <div className={'calendarDiv'}>
                            <div className={'calendarChild'}>
                                <button className={'calendarButton'} onClick={this.onCalendarToggleButtonClick}>날짜 선택</button>
                                <div className={'viewDate'}>{selectDay}</div>
                                <div className={'realCalendarDiv'} style = {{display: !this.state.calendarShow && 'none'}}>
                                    <Calendar value={this.state.date} onChange={this.onCalendarChange}/>
                                </div>
                            </div>
                        </div>
                        <div className={'reserveRow'}>
                            <div className={'rowCol'}>
                                <div className={'colTitle'}>영화 선택</div>
                                <div className={'colBody'}>영화 목록</div>
                            </div>
                            <div className={'rowCol'}>
                                <div className={'colTitle'}>지점 선택</div>
                                <div className={'colBody'}>지점 목록</div>
                            </div>
                            <div className={'rowCol'}>
                                <div className={'colTitle final'}>상영관 선택</div>
                                <div className={'colBody final'}>상영관 목록</div>
                            </div>
                        </div>
                        <div><SelectReserve/></div>
                    </div>
                </div>
            </div>)
    }
}
export default Reserve;