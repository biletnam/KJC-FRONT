import React, { Component } from 'react';
import './MainPage.css';
import MenuNavBar from "./MenuNavBar";
import { Route, Switch, withRouter} from 'react-router-dom';
import {Home, Reserve} from "pages";
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as windowSizeAction from 'reducers/windowSize';
import Movies from "../movies/Movies";
import Login from "../login/Login";
import Register from "../register/Register";
/*import MainMovieSlide from "./MainMovieSlide";*/
class MainPage extends Component {
    alarmHeaderSize = () => {
        const { WindowSizeActions, isOpen}  = this.props;
        if(!isOpen) {
            WindowSizeActions.headerChange(document.getElementsByClassName('mainMenuBar')[0].offsetHeight);
        }
    }
    componentDidMount() {
        this.alarmHeaderSize();
        window.addEventListener("resize", this.alarmHeaderSize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.alarmHeaderSize);
    }
    render() {
        console.log(this.props.header);
        const { header } = this.props;
        return (<div className = "mainParentDiv">
            <div className="mainMenuBar">
                <MenuNavBar onToggle = {this.alarmHeaderSize}/>
            </div>
            <div className = "mainBody">
                <Switch>
                     <Route path = '/reserve' component = {Reserve}/>
                     <Route path ='/movies' component = {Movies}/>
                    <Route path ='/login' component = {Login}/>
                    <Route path='/register' component = {Register}/>
                    <Route exact path='/' component = {Home}/>
                </Switch>
            </div>
        </div>);
    }
}
export default withRouter(connect((state) => ({header: state.windowSize.header, isOpen: state.windowSize.isOpen}), (dispatch) => ({
    WindowSizeActions : bindActionCreators(windowSizeAction,dispatch)
}))(MainPage));