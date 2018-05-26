import React, { Component } from 'react';
import {withRouter, Link, Route, IndexRoute} from 'react-router-dom';
import ManagePeopleList from "./managePeopleList/ManagePeopleList";
import ManagePeopleRegister from "./managePeopleRegister/ManagePeopleRegister";
import './ManagePeopleMain.css';
class ManageMovie extends Component{
    render() {
        return (
            <div className={'managePeopleParentDiv'}>
                <div>
                    <ul>
                        <li><Link to={'/director/managePeople'}>인물 목록</Link></li>
                        <li><Link to={'/director/managePeople/register'}>인물 등록</Link></li>
                    </ul>
                </div>
                <div className={'managePeopleBody'}>
                    <Route exact path={"/director/managePeople"} component= {ManagePeopleList}></Route>
                    <Route path={"/director/managePeople/register"} component= {ManagePeopleRegister}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManageMovie);