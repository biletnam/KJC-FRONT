import React, {Component} from 'react';
import {Col, Form, FormGroup, Label, Input} from 'reactstrap';
import MaskedInput from 'react-text-mask';
import './Register.css';
class Register extends Component {
    render() {
        return (
            <div>
                <div className="page-title">회원가입</div>
                <div className="register-parent-div">
                  <div className="register-form-div">
                      <div className="registerInformation">
                          <p>KJC 회원가입</p>
                      </div>
                      <Form className="form">
                           <FormGroup row>
                              <Label for="id" sm={3}>아이디</Label>
                                  <Col sm={4}>
                                    <Input type="text" name="id" id="idInput" placeholder="아이디"/>
                                  </Col>
                                  <Col sm={2}>
                                      <button className="col-id-check-button">중복확인</button>
                                  </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>비밀번호</Label>
                              <Col sm={4}>
                                <Input type="password" name="password" id="passwordInput" placeholder="비밀번호"/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="passwordCheck" sm={3}>비밀번호 확인</Label>
                              <Col sm={4}>
                                <Input type="password" name="passwordCheck" id="passwordCheckInput" placeholder="비밀번호 확인"/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>주민등록번호</Label>
                              <Col sm={4}>
                                <MaskedInput
                                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                    className="form-control"
                                    placeholder="주민등록번호"/>
                              </Col>
                             </FormGroup>
                             <div className="form-line">
                                 <div></div>
                             </div>
                        </Form>
                  </div>
                </div>
            </div>)
    }
}

export default Register;