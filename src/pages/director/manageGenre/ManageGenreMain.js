import React, {Component} from 'react';
import {withRouter, Link, Route} from 'react-router-dom';
import './ManageGenreMain.css';
import ManageGenreList from "./manageGenreList/ManageGenreList";
import ManageGenreRegister from "./manageGenreRegister/ManageGenreRegister";
class ManageGenreMain extends Component{
    render() {
        const {match} = this.props;
        return (
            <div className={'manageGenreParent'}>
                <div>
                    <ul>
                        <li><Link to={match.url}>장르 목록</Link></li>
                        <li><Link to={match.url + '/register'}>장르    등록</Link></li>
                    </ul>
                </div>
                <div className={'manageGenreBody'}>
                    <Route exact path={match.path } component= {ManageGenreList}></Route>
                    <Route path={match.path + "/register"} component= {ManageGenreRegister}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManageGenreMain);