import React, {Component} from 'react';
import './UserLogin.css';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.state, inputData: this.makeLoginInputState()};
    }
    register = () => {
        const {history} = this.props;
        history.push('/register')
    }
    render() {
        const register = this.register;
        return (
            <div className="user-login-parent-div">
                <div className = "user-login-body-div">
                    <div className = "user-login-form-div">
                        <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>아이디</Label>
                              <Col sm={8}>
                                <Input type="text" name="id" id="idInput" placeholder="아이디" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>비밀번호</Label>
                              <Col sm={8}>
                                <Input type="password" name="password" id="passwordInput" placeholder="비밀번호" />
                              </Col>
                            </FormGroup>
                        </Form>
                        <div className="buttonDiv">
                            <button className="loginButton">로그인</button>
                            <button className ="registerButton" onClick={register}>회원가입</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    makeLoginInputState (){
        return {'id': '', 'password': ''};
    }
}
export default withRouter(UserLogin);