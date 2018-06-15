import React, { Component } from 'react';
import './DirectorMainPage.css';
import DirectorMenuNavBar from "./DirectorMenuNavBar";
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {Home, Reserve} from "pages";
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as windowSizeAction from 'reducers/windowSize';
import * as login from 'reducers/user/login';
import ManageMovie from "../manageMovie/ManageMovie";
import ManagePeopleMain from "../managePeople/ManagePeopleMain";
import ManageGenreMain from "../manageGenre/ManageGenreMain";
import ManageRoomMain from "../manageRoom/ManageRoomMain";
import ManageMovieScheduleMain from "../manageMovieSchedule/ManageMovieScheduleMain";
import ManagePriceMain from "../managePrice/ManagePriceMain";
import ManageMemberMain from "../manageMember/ManageMemberMain";
import ManageBranch from "../manageBranch/ManageBranch";
import ManagePayAndDiscount from "../managePayAndDiscount/ManagePayAndDiscount";
class DirectorMainPage extends Component {
    alarmHeaderSize = () => {
        const { WindowSizeActions, isOpen}  = this.props;
        if(!isOpen) {
            WindowSizeActions.headerChange(document.getElementsByClassName('mainMenuBar')[0].offsetHeight);
        }
    }
    componentDidMount() {
        const {LoginActions, history} = this.props;
        this.alarmHeaderSize();
        window.addEventListener("resize", this.alarmHeaderSize);
        LoginActions.loginCheck()
            .then((data) => {
                LoginActions.getLoginUserInformation()
                    .then((userInformation) => {
                        if(userInformation.IS_USER !== 'D') {
                            history.push('/');
                            alert('관리자 계정만 접속할 수 있습니다.');
                        }
                    }).catch((error) => {history.push('/')});
            }).catch((error) => {
            history.push('/');
            alert('로그인이 필요한 페이지입니다.');
            console.log(error);
        });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.alarmHeaderSize);
    }
    render() {
        console.log(this.props.header);
        const { header, match } = this.props;
        return (<div className = "directorMainParentDiv">
            <div className="mainMenuBar">
                <DirectorMenuNavBar onToggle = {this.alarmHeaderSize}/>
            </div>
            <div className = "mainBody" style={{position: 'absolute', top: header, width: '100%', minHeight: '100%'}}>
                <Route path={match.path + '/managePeople'} component={ManagePeopleMain}></Route>
                <Route path={match.path + '/manageMovie'} component={ManageMovie}></Route>
                <Route path={match.path + '/manageRoom'} component={ManageRoomMain}></Route>
                <Route path={match.path + '/manageGenre'} component={ManageGenreMain}></Route>
                <Route path={match.path + '/manageMovieSchedule'} component={ManageMovieScheduleMain}></Route>
                <Route path={match.path + '/managePrice'} component={ManagePriceMain}></Route>
                <Route path={match.path + '/manageMember'} component={ManageMemberMain}></Route>
                <Route path={match.path + '/manageBranch'} component={ManageBranch}></Route>
                <Route path={match.path + '/payAndDiscount'} component={ManagePayAndDiscount}></Route>
            </div>
        </div>);
    }
}
export default withRouter(connect((state) => ({header: state.windowSize.header, isOpen: state.windowSize.isOpen}), (dispatch) => ({
    WindowSizeActions : bindActionCreators(windowSizeAction,dispatch),
    LoginActions: bindActionCreators(login, dispatch)
}))(DirectorMainPage));