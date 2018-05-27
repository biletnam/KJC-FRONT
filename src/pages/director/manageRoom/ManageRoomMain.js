import React, { Component } from 'react';
import {withRouter, Link, Route, IndexRoute} from 'react-router-dom';
import './ManageRoomMain.css';
import ManageRoomRegister from "./manageRoomRegister/ManageRoomRegister";
import ManageRoomList from "./manageRoomList/ManageRoomList";
import ManageRoomChair from "./manageRoomChair/ManageRoomChair";
class ManageRoomMain extends Component{
    render() {
        const {match} = this.props;
        return (
            <div className={'manageRoomParentDiv'}>
                <div>
                    <ul>
                        <li><Link to={`${match.url}`}>상영관 목록</Link></li>
                        <li><Link to={`${match.url}/register`}>상영관 등록</Link></li>
                        <li><Link to={`${match.url}/chair`}>좌석 가격 지정</Link></li>
                    </ul>
                </div>
                <div className={'manageRoomBody'}>
                    <Route exact path={`${match.path}`} component= {ManageRoomList}></Route>
                    <Route path={`${match.path}/register`} component= {ManageRoomRegister}></Route>
                    <Route path={`${match.path}/chair`} component= {ManageRoomChair}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManageRoomMain);