import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './NonUserLogin.css';
import MaskedInput from 'react-text-mask';
class NonUserLogin extends Component{
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
                            <Input type="text" name="id" id="idInput" placeholder="이름" />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="password" sm={3}>고유번호</Label>
                          <Col sm={4}>
                            <Input type="password" name="password" id="specialNumberInfo" placeholder="고유번호 4자리" maxLength={4} />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="password" sm={3}>주민등록번호</Label>
                          <Col sm={8}>
                            <MaskedInput
                                mask={[/\d/, /\d/, /\d/,/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                className="form-control"
                                placeholder="주민등록번호"
                            />
                          </Col>
                        </FormGroup>
                    </Form>
                    <div className="buttonDiv">
                        <button className="loginButton">비회원 로그인</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default NonUserLogin;