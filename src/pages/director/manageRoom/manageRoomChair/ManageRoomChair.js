import React, { Component } from 'react';
import FindRoom from "../../../common/findRoom/FindRoom";
import './ManageRoomChair.css';
import ManageShowChair from "./manageShowChair/ManageShowChair";
import ManageRoomChairPriceSelect from "./chairPriceSelect/ManageRoomChairPriceSelect";
class ManageRoomChair extends Component {
    state = {roomId: null, selectedChair: []}
    onRoomSelect = (roomId) => {
        this.setState({roomId: roomId, selectedChair: []}, () => {console.log(this.state)});
    }
    onChairClick = (chair) => {
        const selectedChair = [...this.state.selectedChair];
        const index = selectedChair.findIndex((name) => name ===  chair.name);
        if(index === -1) {
            selectedChair.push(chair.name);
            this.setState({selectedChair: selectedChair});
        } else {
            this.setState({selectedChair: selectedChair.filter((c) => c !== chair.name)});
        }
    }
    onRowClick = (needAllClick, chairs) => {
        let selectedChair = [...this.state.selectedChair];
        if(needAllClick) {
            chairs.map((c) => {
                const index = selectedChair.findIndex((name) => name ===  c.name);
                if(index === -1) {
                    selectedChair.push(c.name);
                }
            })
        }else {
            chairs.forEach((c) => {
                selectedChair = selectedChair.filter((name) => name !==c.name);
            })
        }
        this.setState({selectedChair: selectedChair});
    }
    render() {
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
                    {this.state.roomId &&
                        <ManageShowChair roomId = {this.state.roomId} selectedChair = {this.state.selectedChair}
                                         onChairClick = {this.onChairClick}
                                         onRowClick = {this.onRowClick}
                        />
                    }
                </div>
                <div className={'chairPriceSelectDiv'}>
                    <ManageRoomChairPriceSelect/>
                </div>
                <div className={'chairPriceButton'}>
                    <button>등록</button>
                </div>
            </div>
        </div>)
    }
}
export default ManageRoomChair;