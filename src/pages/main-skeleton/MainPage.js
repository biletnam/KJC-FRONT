import React, { Component } from 'react';
import './MainPage.css';
import MenuNavBar from "./MenuNavBar";
import { Route, Switch, withRouter} from 'react-router-dom';
import {Home} from "pages";
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as windowSizeAction from 'reducers/windowSize';
import * as loginAction from 'reducers/user/login';
import Movies from "../movies/Movies";
import Login from "../login/Login";
import Register from "../register/Register";
import Reserve from "../reserve/Reserve";
import { checkLogin } from "../../reducers/loginUtil";
import User from "../user/User";
import ReserveInfo from "../reserveInfo/ReserveInfo";

/*import MainMovieSlide from "./MainMovieSlide";*/
class MainPage extends Component {
    state = {
        renderAvailable: false
    }
    alarmHeaderSize = () => {
        const { WindowSizeActions, isOpen}  = this.props;
        WindowSizeActions.menuClose();
        if(!isOpen) {
            WindowSizeActions.headerChange(document.getElementsByClassName('mainMenuBar')[0].offsetHeight);
        }
    }
    renderAvialable = () => {
        this.setState({renderAvailable: true});
    }
    componentWillMount() {
        const {LoginActions} = this.props;
        checkLogin().then((data) => {
            console.log('loginSuccess', data)
            LoginActions.loginSuccess();
            this.renderAvialable();
        }).catch((error) => {if(error === 'noToken') {
            this.renderAvialable();
            return false;
        }});
    }
    componentDidMount() {
        const store = this.props.store;
        console.log('thisis store', store);
        if(this.state.renderAvailable) {
            this.alarmHeaderSize();
        }
        window.addEventListener("resize", this.alarmHeaderSize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.alarmHeaderSize);
    }
    render() {
        console.log(this.props.header);
        const { header, loginData} = this.props;
        return (this.state.renderAvailable && <div className = "mainParentDiv" id= 'mainParentDiv'>
            <div className="mainMenuBar">
                <MenuNavBar onToggle = {this.alarmHeaderSize} isLogin = {loginData.login}/>
            </div>
            <div className = "mainBody" style={{position: 'absolute', top: header, width: '100%', minHeight: '100%'}}>
                <Switch>
                     <Route path = '/reserve' component = {Reserve}/>
                     <Route path ='/movies' component = {Movies}/>
                    <Route path ='/login' component = {Login}/>
                    <Route path='/register' component = {Register}/>
                    <Route path={'/userInfo'} component = {User}/>
                    <Route path={'/reserveInfo'} component = {ReserveInfo}/>
                 {/*   <Roue path='/reserve-detail'/>*/}
                    <Route exact path='/' component = {Home}/>
                </Switch>
            </div>
        </div>);
    }
}
export default withRouter(connect((state) => ({header: state.windowSize.header, isOpen: state.windowSize.isOpen, loginData: state.login}), (dispatch) => ({
    WindowSizeActions : bindActionCreators(windowSizeAction,dispatch),
    LoginActions: bindActionCreators(loginAction, dispatch)
}))(MainPage));