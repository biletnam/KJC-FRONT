import React, { Component } from 'react';
import FindRoom from "../../../common/findRoom/FindRoom";
import './ManageRoomChair.css';
import ManageShowChair from "./manageShowChair/ManageShowChair";
import ManageRoomChairPriceSelect from "./chairPriceSelect/ManageRoomChairPriceSelect";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as seat from 'reducers/seat';
import * as seatType from 'reducers/seatType';
import axios from 'axios';
import {serverUrl} from "../../../../reducers/urlUtil";

class ManageRoomChair extends Component {
    state = {branchId: null, cinemaNo: null, selectedChair: [], seatTypeId: null}
    componentDidMount() {
        const {SeatTypeActions} = this.props;
        SeatTypeActions.getSeatType();
    }
    onRoomSelect = (branchId, cinemaNo) => {
        const {SeatActions} = this.props;
        this.setState({branchId: branchId, cinemaNo: cinemaNo, selectedChair: []}, () => {
            if(!(this.state.cinemaNo == -1 || this.state.branchId == -1)) {
                SeatActions.getSeatsByCNOAndBID(this.state.cinemaNo, this.state.branchId);
            }
        });
    }
    onChairClick = (chair) => {
        const selectedChair = [...this.state.selectedChair];
        const index = selectedChair.findIndex((name) => name ===  chair.SEAT_NAME);
        if(index === -1) {
            selectedChair.push(chair.SEAT_NAME);
            this.setState({selectedChair: selectedChair});
        } else {
            this.setState({selectedChair: selectedChair.filter((c) => c !== chair.SEAT_NAME)});
        }
    }
    onRowClick = (needAllClick, chairs) => {
        let selectedChair = [...this.state.selectedChair];
        if(needAllClick) {
            chairs.map((c) => {
                const index = selectedChair.findIndex((name) => name ===  c.SEAT_NAME);
                if(index === -1) {
                    selectedChair.push(c.SEAT_NAME);
                }
            })
        }else {
            chairs.forEach((c) => {
                selectedChair = selectedChair.filter((name) => name !==c.SEAT_NAME);
            })
        }
        this.setState({selectedChair: selectedChair});
    }
    onSeatTypeChange = (seatTypeId) => {
        this.setState({seatTypeId: seatTypeId}, () => {
            console.log(this.state);
        })
    }
    onSubmit = () => {
        const selectedChair = this.state.selectedChair;
        const branchId = this.state.branchId;
        const cinemaNo = this.state.cinemaNo;
        const seatTypeId = this.state.seatTypeId;

        if(branchId == -1 || cinemaNo == -1 || seatTypeId == -1 || selectedChair.length === 0){
            alert('업데이트할 항목이 설정되지 않았습니다.');
            return false;
        }
        const data = {
            selectedSeatNames: selectedChair,
            branchId: branchId,
            cinemaNumber: cinemaNo,
            seatTypeId: seatTypeId
        }
        axios.put(serverUrl + '/api/seats/seatType', data, { headers: {
            'Content-Type': 'application/json'
        }}).then((result) => {
            alert('좌석 종류 등록이 완료됐습니다.')
        }).catch((error) => {
            console.log(error);
        })
    }
    render() {
        const seatPending = this.props.seat.pending;
        const seats = this.props.seat.data.seat;
        const seatTypePending = this.props.seatType.pending;
        const seatType = this.props.seatType.data.seatType;
        return (<div className={'manageRoomChairParentDiv'}>
            <div className={'manageRoomChairTitle'}>좌석 가격 지정</div>
            <div className={'manageRoomChairBody'}>
                <div className={'manageChairFindRoom'}>
                   <FindRoom onRoomSelect = {this.onRoomSelect}/>
                </div>
                <div style={{'textAlign': 'left'}}>
                    <p className={'selectedChairCount'}>선택된 좌석 수: {this.state.selectedChair.length}</p>
                </div>
                <div className={'manageChairShow'}>
                    {seatPending && <p>좌석을 불러오는 중입니다.</p>}
                    {this.state.cinemaNo && this.state.cinemaNo !== -1 && !seatPending &&
                        <ManageShowChair seats = {seats}
                                         selectedChair = {this.state.selectedChair}
                                         onChairClick = {this.onChairClick}
                                         onRowClick = {this.onRowClick}
                        />
                    }
                </div>
                <div className={'chairPriceSelectDiv'}>
                    {!seatTypePending && <ManageRoomChairPriceSelect seatType = {seatType} onSeatTypeChange={this.onSeatTypeChange}/>}
                </div>
                <div className={'chairPriceButton'}>
                    <button onClick={this.onSubmit}>등록</button>
                </div>
            </div>
        </div>)
    }
}
export default connect((state) => ({seat: state.seat, seatType: state.seatType}), (dispatch) => ({
    SeatActions: bindActionCreators(seat, dispatch),
    SeatTypeActions: bindActionCreators(seatType, dispatch)
}))(ManageRoomChair);