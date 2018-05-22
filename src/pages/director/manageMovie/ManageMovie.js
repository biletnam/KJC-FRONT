import React, {Component} from 'react';
import {withRouter, Link, Route} from 'react-router-dom';
import './ManageMovie.css';
import ManageMovieList from "./manageMovieList/ManageMovieList";
import ManageMovieRegister from "./manageMovieRegister/ManageMovieRegister";
class ManageMovie extends Component{
    render() {
        return (
            <div className={'manageMovieParentDiv'}>
                <div>
                    <ul>
                        <li><Link to={'/director/manageMovie/list'}>영화 목록</Link></li>
                        <li><Link to={'/director/manageMovie/register'}>영화 등록</Link></li>
                    </ul>
                </div>
                <div className={'manageMovieBody'}>
                    <Route path={"/director/manageMovie/list"} component= {ManageMovieList}></Route>
                    <Route path={"/director/manageMovie/register"} component= {ManageMovieRegister}></Route>
                </div>
            </div>
        )
    }
}
export default withRouter(ManageMovie);