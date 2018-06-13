import React, {Component} from 'react';
import {withRouter, Link, Route} from 'react-router-dom';
import './ManageBranch.css';
import BranchRegister from "./branchRegister/BranchRegister";
import BranchList from "./branchList/BranchList";
class ManageBranch extends Component{
    render() {
        const {match} = this.props;
        return (
            <div className={'managePriceParent'}>
                <div>
                    <ul>
                        <li><Link to={match.url}>지점 목록</Link></li>
                        <li><Link to={match.url + '/register'}>지점 등록</Link></li>
                    </ul>
                </div>
                <div className={'managePriceBody'}>
                    <Route exact path={match.path } component= {BranchList}></Route>
                    <Route path={match.path + "/register"} component= {BranchRegister}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManageBranch);