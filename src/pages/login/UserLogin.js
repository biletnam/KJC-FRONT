import React, {Component} from 'react';
import './UserLogin.css';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as loginAction from 'reducers/user/login';
import {serverUrl} from "../../reducers/urlUtil";
import Swal from 'sweetalert2';
class UserLogin extends Component {
    state = {
        idInput: '',
        passwordInput: '',
        loading: false
    }
    constructor(props) {
        super(props);
        this.state = {...this.state, inputData: this.makeLoginInputState()};
    }
    register = () => {
        const {history} = this.props;
        history.push('/register')
    }
    onInputChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState({[id]: value}, ()=> {console.log(this.state);});
    }
    loginButtonClick = () => {
        const id = this.state.idInput;
        const password = this.state.passwordInput;
        const {history, LoginActions} = this.props;
        this.setState({loading: true});
        axios.post(serverUrl + '/api/login', {id: id, password: password}, {header: {'Content-Type': 'application/json'}})
            .then((result) => {
                this.setState({loading: false});
                const token = result.data.token;
                console.log('success');
                sessionStorage.setItem('kjc_token', token);
                LoginActions.loginSuccess();
                history.push('/');
            })
            .catch((error)=> {
            console.log('error');
            this.setState({loading: false});
            Swal({
                title: '로그인 실패',
                text: '아이디/ 비밀번호를 확인해주세요',
                type: 'error',
                confirmButtonText: '확인',
            })
        });
    }
    render() {
        const register = this.register;
        return (
            <div className="user-login-parent-div">
                {!this.state.loading &&
                <div className = "user-login-body-div">
                    <div className = "user-login-form-div">
                        <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>아이디</Label>
                              <Col sm={8}>
                                <Input type="text" name="id" id="idInput" placeholder="아이디" value={this.state.idInput} onChange={this.onInputChange}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>비밀번호</Label>
                              <Col sm={8}>
                                <Input type="password" name="password" id="passwordInput" placeholder="비밀번호" value={this.state.passwordInput} onChange={this.onInputChange}/>
                              </Col>
                            </FormGroup>
                        </Form>
                        <div className="buttonDiv">
                            <button className="loginButton" onClick={this.loginButtonClick}>로그인</button>
                            <button className ="registerButton" onClick={register}>회원가입</button>
                        </div>
                    </div>
                </div>
                }
                {this.state.loading && <div>로그인중입니다...</div>}
            </div>
        )
    }
    makeLoginInputState (){
        return {'id': '', 'password': ''};
    }
}
export default withRouter(connect((state) => ({}), (dispatch) => ({
    LoginActions: bindActionCreators(loginAction,dispatch)
}))(UserLogin));