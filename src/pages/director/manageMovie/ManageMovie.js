import React, {Component} from 'react';
import {withRouter, Link, Route} from 'react-router-dom';
import './ManageMovie.css';
import ManageMovieList from "./manageMovieList/ManageMovieList";
import ManageMovieRegister from "./manageMovieRegister/ManageMovieRegister";
class ManageMovie extends Component{
    render() {
        const {match} = this.props;
        return (
            <div className={'manageMovieParentDiv'}>
                <div>
                    <ul>
                        <li><Link to={match.url}>영화 목록</Link></li>
                        <li><Link to={match.url + '/register'}>영화 등록</Link></li>
                    </ul>
                </div>
                <div className={'manageMovieBody'}>
                    <Route exact path={match.path } component= {ManageMovieList}></Route>
                    <Route path={match.path + "/register"} component= {ManageMovieRegister}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManageMovie);