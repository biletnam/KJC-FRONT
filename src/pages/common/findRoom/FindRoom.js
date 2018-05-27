import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import './FindRoom.css';
class FindRoom extends Component {
    spot;
    room;
    state = {spotRoom: [], spotId: null, roomId: null}
    componentDidMount(){
        setTimeout(()=> {
            this.spot = [{id:1, name: '지점 1'}, {id:2, name: "지점 2"}];
            this.room =[{id:1, spotId: 1, name:'상영관1'},
                {id:2, spotId: 1, name: '상영관2'},
                {id: 3, spotId:2, name: '상영관1'},
                {id:4, spotId:2, name: '상영관 2'}
            ];
            this.spotSetting(this.spot);
        },1000);
        console.log("componentDidMount");
    }
    spotSetting = (spot) => {
        const newSpot = [{id: -1, name: '선택 안됨'}, ...spot];
        this.spot = newSpot;
        this.setState({spotId: -1})
    }
    spotSelect = (event) => {
        const {onRoomSelect} = this.props;
        const spotId = event.target.value;
        const spotRoom = this.room.filter((r) => r.spotId === Number(spotId));
        const defaultRoomId = spotRoom[0] && spotRoom[0].id;
        this.setState({spotId: spotId, spotRoom: spotRoom, roomId: defaultRoomId}, () => {
            onRoomSelect(this.state.roomId);
        });
    }
    roomSelect = (event) => {
        const { onRoomSelect } = this.props;
        const roomId = Number(event.target.value);
        this.setState({roomId: roomId}, () => {
            onRoomSelect(this.state.roomId);
        });
    }
    render() {
        return (
            <div className={'findRoomParentDiv'}>
                <div className={'findSpotDiv'}>
                    {
                        this.state.spotId &&
                            <select value = {this.state.spotId} onChange={this.spotSelect}>
                            {this.spot.map((s) => {
                                return (<option value={s.id}>{s.name}</option>)
                            })}
                            </select>
                    }
                </div>
                <div className={'findRoomDiv'}>
                    {this.state.spotId && this.state.roomId &&
                         <select value = {this.state.roomId} onChange={this.roomSelect}>
                             {this.state.spotRoom.map((r) => {
                                 return (<option value={r.id}>{r.name}</option>)
                             })}
                         </select>
                    }
                </div>
            </div>
        )
    }

}
export default FindRoom;
