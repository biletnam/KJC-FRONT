import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {checkLogin} from "../../reducers/loginUtil";
import {withRouter, Link, Route} from 'react-router-dom';
import * as loginAction from 'reducers/user/login';
import './UserInformation.css';
import UserInformationUpdate from "./userInformationUpdate/UserInformationUpdate";
import Modal from 'react-modal';
import {Table, Button} from 'reactstrap';
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding: 0,
        zIndex: '99999999'
    }
};
Modal.setAppElement('#root');

class UserInformation extends Component {
    state = {
        modalIsOpen: false
    }
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
        LoginActions.getLoginUserInformation();
    }
    userInformationUpdateClick = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    render() {
        const {userInformation, match} = this.props;
        console.log(userInformation);
        return (
            <React.Fragment>
                <div className={'user-information-title'}>회원 정보</div>
                 <div className={'user-information-parent-div'}>
                    <div className={'user-information-body'}>
                        <Table bordered>
                            <tr>
                                <th>이름</th><td>{userInformation.USER_NAME}</td>
                            </tr>
                             <tr>
                                <th>포인트</th><td>{userInformation.POINT}</td>
                            </tr>
                            <tr>
                                <th>전화번호</th><td>{userInformation.PHONE}</td>
                            </tr>
                            <tr>
                                <th>이메일</th><td>{userInformation.EMAIL}</td>
                            </tr>
                            <tr>
                                <th>주소</th><td>{userInformation.ZIP_CODE} - {userInformation.ADDR} {userInformation.ADDR_DET}</td>
                            </tr>
                            <tr>
                                <th>생일</th><td>{userInformation.BIRTH}</td>
                            </tr>
                        </Table>
                            <Button className={'user-information-button'}>이름/전화번호 수정</Button>
                            <Button className={'user-information-button'}>비밀번호 수정</Button>
                            <Button className={'user-information-button'} onClick={this.userInformationUpdateClick}>기타 정보 수정하기</Button>
                    </div>
                </div>
                 <Modal
                     isOpen={this.state.modalIsOpen}
                     onRequestClose={this.closeModal}
                     style={customStyles}
                     contentLabel="Example Modal">
                     <UserInformationUpdate onCloseUpdateModal = {this.closeModal} userInformation = {userInformation}/>
                 </Modal>
            </React.Fragment>
        )
    }
}
export default withRouter(connect((state) => ({isLogin: state.login.login, userInformation: state.login.userInformation}),(dispatch) => ({
    LoginActions: bindActionCreators(loginAction,dispatch)
}))(UserInformation));