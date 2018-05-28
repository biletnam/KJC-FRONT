import React, {Component} from 'react';
import {withRouter, Link, Route} from 'react-router-dom';
import './ManageMemberMain.css';
import ManageMemberList from "./manageMemberList/ManageMemberList";
class ManageMemberMain extends Component{
    render() {
        const {match} = this.props;
        return (
            <div className={'manageMemberParent'}>
                <div>
                    <ul>
                        <li><Link to={match.url}>회원 목록</Link></li>
                    </ul>
                </div>
                <div className={'manageMemberBody'}>
                    <Route exact path={match.path } component= {ManageMemberList}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManageMemberMain);