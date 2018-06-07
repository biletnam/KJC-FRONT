import React, {Component} from 'react';
import {Col, Form, FormGroup, Label, Input} from 'reactstrap';
import MaskedInput from 'react-text-mask';
import './Register.css';
import * as urlUtil from 'reducers/urlUtil';
import axios from 'axios';

import Swal from 'sweetalert2';
import Modal from 'react-modal';
import GetPostCode from "./GetPostCode";
import { withRouter } from 'react-router-dom';

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
class Register extends Component {
    state = {
        modalIsOpen: false,
        postCode: '',
        jibunAddress: '',
        nameInput: '',
        idInput: '',
        passwordInput: '',
        passwordCheckInput: '',
        addressDetail: '',
        phoneInput: '',
        emailInput: '',
        identificationNumber: '',
        idCheckState: 'NONE',
        error: {passwordCheck: false}
    };
    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    onInputChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState({[id]: value}, ()=> {
            const {passwordInput, passwordCheckInput} = this.state;
            if(passwordCheckInput.length !== 0 && passwordInput !== passwordCheckInput) {
                this.setState({error: {...this.state.error, passwordCheck: true}})
            }else {
                this.setState({error: {...this.state.error, passwordCheck: false}})
            }
            console.log(this.state);
        });
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    componentDidMount () {
    }
    getPostCode = (postData) => {
        this.setState({postCode: postData.postCode, jibunAddress: postData.jibunAddress})
    }
    identificationChange = (event) => {
        this.setState({identificationNumber: event.target.value});
    }
    registerButton = () => {
        if(this.state.idCheckState !== 'SUCCESS') {
            alert('아이디 중복 체크를 해주셔야 합니다!');
            return false;
        }
        const data = {
            "name" : this.state.nameInput,
            "id" : this.state.idInput,
            "password": this.state.passwordInput,
            "email": this.state.emailInput,
            "birth": this.state.identificationNumber,
            "phone": this.state.phoneInput,
            "zipCode": this.state.postCode,
            "address": this.state.jibunAddress,
            "address_detail": this.state.addressDetail
        }
        const result = this.validateAndWrapping(data);
        if(!result) {
            return false;
        }
        console.log(result);
        const {history} = this.props;
        axios.post(urlUtil.serverUrl + '/api/customer/user', data, {header: {
            'Content-Type': 'application/json'
        }})
            .then((result) => {
                if(result.data === 'success') {
                    Swal({
                        title: '성공',
                        text: '회원 가입이 완료됐습니다.',
                        type: 'success',
                        confirmButtonText: '확인',
                    }).then((result) => {
                        history.push('/login');
                    })
                }
            }).catch((error) => {
            alert('실패!');
        })
    }
    validateAndWrapping = (data) => {
        const errors = {name: false, id: false, password: false, email: false, birth: false, phone: false, zipCode: false, address: false, address_detail: false};
        (!data.name || data.name.length < 1) ? errors.name = true : errors.name = false;
        (!data.id || data.id.length < 5) ? errors.id = true : errors.id = false;
        (!data.birth || data.birth.length < 5) ? errors.birth = true : errors.birth = false;
        (!data.password || data.password.length < 8) ? errors.password = true : errors.password = false;
        (!data.email ||  String(data.email).indexOf('@') == -1) ? errors.email = true : errors.email = false;
        (!data.phone || data.phone.length < 5) ? errors.phone = true : errors.phone = false;
        (!data.zipCode || data.zipCode.length < 5) ? errors.zipCode = true : errors.zipCode = false;
        (!data.address_detail || data.address_detail.length < 1) ? errors.address_detail = true : errors.address_detail = false;

        const birth = String(data.birth).split('-')[0];
        if(!birth || birth.length !==6 || isNaN(birth)) {
            errors.birth = true;
        }
        console.log(errors);
        this.setState({error: {...this.state.error, ...errors}});

        let totalError = false;
        Object.keys(errors).forEach((key) => {
            totalError = totalError || errors[key];
        })
        if(totalError) {
            return false;
        }

        data.birth = birth;
        return data;
    }
    checkId = () => {
        const serverUrl = urlUtil.serverUrl;
        console.log(serverUrl);
        axios.get(serverUrl + `/api/customer/user/${this.state.idInput}/check`)
            .then((result) => {
                if(result && result.data) {
                    this.setState({idCheckState: 'FAIL'})
                }else {
                    this.setState({idCheckState: 'SUCCESS'})
                }
            }).catch((error) => {
            console.log(error);
            alert('아이디 확인이 실패했습니다.');
        })
    }
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
                                    <Input type="text" name="id" id="idInput" placeholder="아이디" value={this.state.idInput} onChange = {this.onInputChange}/>
                                  </Col>
                                  <Col sm={2}>
                                      <button className="col-id-check-button" type={'button'} onClick={this.checkId}>중복확인</button>
                                  </Col>
                                  <Col sm={3}>
                                      {this.state.idCheckState === 'FAIL' && <p className={'errorMessage'}>아이디가 이미 존재합니다.</p>}
                                      {this.state.idCheckState === 'SUCCESS' && <p className={'successMessage'}>아이디 중복 확인이 완료됐습니다.</p>}
                                      {this.state.error.id && <p className={'errorMessage'}>아이디를 5글자 이상 입력해주세요.</p>}
                                  </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>비밀번호</Label>
                              <Col sm={4}>
                                <Input type="password" name="password" id="passwordInput" placeholder="비밀번호" value={this.state.passwordInput} onChange = {this.onInputChange}/>
                              </Col>
                                <Col sm={3}>
                                     {this.state.error.password && <p className={'errorMessage'}>비밀번호를 8글자 이상 입력하세요</p>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="passwordCheck" sm={3}>비밀번호 확인</Label>
                              <Col sm={4}>
                                <Input type="password" name="passwordCheck" id="passwordCheckInput" placeholder="비밀번호 확인"  value={this.state.passwordCheckInput} onChange = {this.onInputChange}/>
                              </Col>
                                <Col sm={3}>
                                    {this.state.error.passwordCheck && '비밀번호를 확인해주세요'}
                                </Col>
                            </FormGroup>
                             <div className="form-line">
                                 <div></div>
                             </div>
                             <FormGroup row  className={'makeMarginTop20'}>
                                 <Label for="phone" sm={3}>이름</Label>
                                  <Col sm={4}>
                                    <Input type="name" name="name" id="nameInput" placeholder="이름"  value={this.state.nameInput} onChange = {this.onInputChange}/>
                                  </Col>
                                  <Col sm={3}>
                                     {this.state.error.name && <p className={'errorMessage'}>이름은 한글자 이상 입력해주세요</p>}
                                 </Col>
                             </FormGroup>
                             <FormGroup row>
                              <Label for="password" sm={3}>주민등록번호</Label>
                              <Col sm={4}>
                                <MaskedInput
                                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', '*', '*', '*', '*', '*', '*', '*']}
                                    className="form-control"
                                    value = {this.state.identificationNumer}
                                    onChange = {this.identificationChange}
                                    placeholder="주민등록번호(앞자리)"/>
                              </Col>
                                 <Col sm={4}>
                                     {this.state.error.birth &&<p className={'errorMessage'}>주민번호를 확인해주세요.</p>}
                                 </Col>
                             </FormGroup>
                             <FormGroup row>
                              <Label for="phone" sm={3}>전화번호</Label>
                              <Col sm={4}>
                                <Input type="phone" name="phone" id="phoneInput" placeholder="전화번호(숫자만)"  value={this.state.phoneInput} onChange = {this.onInputChange}/>
                              </Col>
                                <Col sm={4}>
                                     {this.state.error.phone &&<p className={'errorMessage'}>전화번호를 확인해주세요.</p>}
                                 </Col>
                             </FormGroup>
                             <FormGroup row>
                                 <Label for="phone" sm={3}>이메일</Label>
                                  <Col sm={4}>
                                    <Input type="email" name="email" id="emailInput" placeholder="이메일"  value={this.state.emailInput} onChange = {this.onInputChange}/>
                                  </Col>
                                  <Col sm={3}>
                                     {this.state.error.phone &&<p className={'errorMessage'}>이메일을 확인하세요, @ 문자가 들어가야 합니다.</p>}
                                  </Col>
                             </FormGroup>
                             <div className="form-line">
                                 <div></div>
                              </div>
                        </Form>
                        <div className={'address-input-div-parent'}>
                            <div className={'address-input-div'}>
                                <span>우편번호</span><input id={'postCode'} value={this.state.postCode} className={'postCode form-control'} disabled={true}/><button onClick={this.openModal}>검색</button>
                                {this.state.error.zipCode &&<p className={'errorMessage'}>우편번호를 입력해야 합니다.</p>}
                            </div>
                            <div className={'address-input-div'}>
                                <span>주소</span>
                                <input id={'bigAddress'} className={'bigAddress form-control'} value={this.state.jibunAddress} disabled={true}/>
                            </div>
                            <div className={'address-input-div'}>
                                <span>상세 주소</span>
                                <input id={'addressDetail'} className={'addressDetail form-control'}  value={this.state.addressDetail} onChange = {this.onInputChange}/>
                                {this.state.error.address_detail &&<p className={'errorMessage'}>상세 주소를 입력해주세요</p>}
                            </div>
                        </div>
                      <div className={'register-button-div'}>
                          <button onClick={this.registerButton}>회원가입</button>
                      </div>
                  </div>
                </div>
                 <Modal
                     isOpen={this.state.modalIsOpen}
                     onRequestClose={this.closeModal}
                     style={customStyles}
                     contentLabel="Example Modal">
                        <GetPostCode onClose={this.closeModal} onGetPostCode = {this.getPostCode}/>
                 </Modal>
            </div>)
    }
}

export default withRouter(Register);