import React, { Component } from 'react';
import {withRouter, Link, Route} from 'react-router-dom';
import './ManageMovieScheduleMain.css';
import ManageMovieScheduleRegister from "./manageMovieScheduleRegister/ManageMovieScheduleRegister";
import ManageMovieScheduleList from "./manageMovieScheduleList/ManageMovieScheduleList";
class ManageMovie extends Component{

    render() {
        const {match} = this.props;
        return (
            <div className={'manageMovieScheduleParent'}>
                <div>
                    <ul>
                        <li><Link to={`${match.url}`}>상영 일정 목록</Link></li>
                        <li><Link to={`${match.url}/register`}>상영 일정 등록</Link></li>
                    </ul>
                </div>
                <div className={'manageMovieScheduleBody'}>
                    <Route exact path={`${match.path}`} component= {ManageMovieScheduleList}></Route>
                    <Route path={`${match.path}/register`} component= {ManageMovieScheduleRegister}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManageMovie);