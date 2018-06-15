import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './NonUserLogin.css';
import MaskedInput from 'react-text-mask';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as loginAction from 'reducers/user/login';
import {serverUrl} from "../../reducers/urlUtil";
import Swal from 'sweetalert2';

class NonUserLogin extends Component{
    state = {
        nameInput: '',
        phoneInput: ''
    }
    onInputChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        this.setState({[id]: value});
    }
    nonUserLogin = () => {
        const {LoginActions, history} = this.props;
        const name = this.state.nameInput;
        const phone = this.state.phoneInput;

        if(!name || name.length < 1) {
            alert('이름을 한글자 이상 입력하세요');
            return;
        }
        if(!phone || phone.length < 3) {
            alert('전화번호를 확인하세요');
            return;
        }
        LoginActions.postNonUserLogin(name, phone)
            .then((data) => {
                console.log(data);
                LoginActions.getLoginUserInformation();
                history.push('/');
            }).catch((error) => {
            alert('로그인 실패');
            console.log(error);
        });
    }
    render() {
        return (
            <div className="non-user-login-parent">
                <div className="formDiv">
                    <div className="information">
                        <p>*비회원으로 서비스 이용시 포인트 적립 등의 서비스를 제공 받을 수 없습니다.</p>
                    </div>
                      <Form className="form">
                        <FormGroup row>
                          <Label for="id" sm={3}>이름</Label>
                          <Col sm={8}>
                            <Input type="text" name="name" id="nameInput" placeholder="이름" onChange = {this.onInputChange}/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="password" sm={3}>핸드폰 번호</Label>
                          <Col sm={8}>
                            <Input type="text" name="phone" id="phoneInput" placeholder="전화번호(숫자만)" onChange = {this.onInputChange}/>
                          </Col>
                        </FormGroup>
                    </Form>
                    <div className="buttonDiv">
                        <button className="loginButton" onClick={this.nonUserLogin}>비회원 로그인</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default  withRouter(connect((state) => ({}), (dispatch) => ({
    LoginActions: bindActionCreators(loginAction,dispatch)
}))(NonUserLogin));