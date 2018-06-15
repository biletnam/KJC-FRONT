import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {checkLogin} from "../../reducers/loginUtil";
import {withRouter, Link, Route} from 'react-router-dom';
import * as loginAction from 'reducers/user/login';
import './User.css';
import UserInformation from "./UserInformation";
import PayHistory from "./PayHistory";
class User extends Component {
    componentWillMount() {
        const {history} = this.props;
        checkLogin()
            .catch((error) => {
                history.push('/');
                }
            )
    }
    componentDidMount() {
        console.log('mount');
        const {LoginActions} = this.props;
        console.log(LoginActions);
        LoginActions.getLoginUserInformation();
    }
    render() {
        const {userInformation, match} = this.props;
        console.log(userInformation);
        return (
            <React.Fragment>
                <div className={'user-information-parent-title'}>
                    <div>
                    <ul>
                        <li><Link to={match.url}>회원 정보</Link></li>
                        <li><Link to={match.url + '/payHistory'}>결제 정보</Link></li>
                    </ul>
                </div>
                </div>
                 <div className={'user-information-total-parent-div'}>
                    <div className={'user-information-total-body'}>
                        <Route exact path={match.path } component ={UserInformation}></Route>
                         <Route exact path={match.path +'/payHistory' } component ={PayHistory}></Route>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(connect((state) => ({isLogin: state.login.login, userInformation: state.login.userInformation}),(dispatch) => ({
   LoginActions: bindActionCreators(loginAction,dispatch)
}))(User));