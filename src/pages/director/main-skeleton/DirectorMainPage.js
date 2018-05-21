import React, { Component } from 'react';
import './DirectorMainPage.css';
import DirectorMenuNavBar from "./DirectorMenuNavBar";
import { Route, Switch, withRouter} from 'react-router-dom';
import {Home, Reserve} from "pages";
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as windowSizeAction from 'reducers/windowSize';
class DirectorMainPage extends Component {
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
                <DirectorMenuNavBar onToggle = {this.alarmHeaderSize}/>
            </div>
            <div className = "mainBody">
            </div>
        </div>);
    }
}
export default withRouter(connect((state) => ({header: state.windowSize.header, isOpen: state.windowSize.isOpen}), (dispatch) => ({
    WindowSizeActions : bindActionCreators(windowSizeAction,dispatch)
}))(DirectorMainPage));