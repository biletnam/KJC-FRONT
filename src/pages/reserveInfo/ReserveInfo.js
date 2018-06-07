import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {checkLogin} from "../../reducers/loginUtil";
import {withRouter} from 'react-router-dom';
import * as loginAction from 'reducers/user/login';
import './ReserveInfo.css';
class ReserveInfo extends Component {
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
        const {userInformation} = this.props;
        console.log(userInformation);
        return (
            <React.Fragment>
                <div className={'reserve-information-title'}>예매 정보</div>
                 <div className={'reserve-information-parent-div'}>
                    <div className={'reserve-information-body'}>
                        <div>이름: {userInformation.USER_NAME}</div>
                        <div>포인트: {userInformation.POINT}</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(connect((state) => ({isLogin: state.login.login, userInformation: state.login.userInformation}),(dispatch) => ({
    LoginActions: bindActionCreators(loginAction,dispatch)
}))(ReserveInfo));