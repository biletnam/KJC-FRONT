import React, { Component } from 'react'
import "./ManagePeopleRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import { connect } from 'react-redux';
import * as movies from 'reducers/movies';
import { bindActionCreators} from 'redux';
class ManagePeopleRegister extends Component {
    fileInput;
    emptyInputSetting = {
        nameInput: '',
        roleInput: '',
        runningTimeInput: ''
    }
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            error: {},
            ...this.emptyInputSetting
        }
        this.fileInput = React.createRef();
    }
    onInputChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState({[id]: value}, ()=> {
            console.log(this.state);
            console.log(this.fileInput.files);
        });
        window.hey = this.state;
    }
    onSubmitButton = (event) => {
        const data = {...this.state};
        let noError = true;
        const errorState = {nameInput: false, fileInput: false, roleInput: false};
        if(!data.nameInput || data.nameInput.length < 1) {
            errorState.nameInput = true;
            noError = noError && false;
        }
        if(this.fileInput.files.length === 0 ) {
            errorState.fileInput = true;
            noError = noError && false;
        }
        if(!data.roleInput || data.roleInput.length < 1) {
            errorState.roleInput = true;
            noError = noError && false;
        }
        if(!noError) {
            this.setState((state) => ({...state, error: errorState}));
            return false;
        }
        const formData = new FormData();
        formData.append('name', this.state.nameInput);
        formData.append('role', this.state.roleInput);
        formData.append('imageFile', this.fileInput.files[0]);
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        axios.post('http://localhost:5000/api/people', formData, { headers: {
            'Content-Type': 'multipart/form-data'
        }}).then((response) => {
            console.log(response);
            this.fileInput.value = '';
            this.setState((state) => ({...this.state, ...this.emptyInputSetting}));
            alert('인물 등록에 성공하였습니다.');
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        const { onInputChange, state, onSubmitButton }  = this;
        return (
            <div className={'managePeopleRegisterParentDiv'}>
                <div className={'registerTitle'}>
                    인물 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>인물 이름</Label>
                              <Col sm={6}>
                                <Input type="text" name="name" value={this.state.nameInput} id="nameInput" placeholder="인물 이름" onChange={onInputChange} />
                              </Col>
                                {this.state.error['nameInput'] && <Col sm={2}>
                                    <FormText className={'error'}>이름을 입력해 주세요</FormText>
                                </Col>}
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>인물 프로필 사진</Label>
                              <Col sm={4}>
                                <input type="file" name="imageFile" id="imageFileInput" ref={input => {this.fileInput = input}}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>역할</Label>
                              <Col sm={6}>
                                  <Input type="text" value = {this.state.roleInput} name="role" id="roleInput" placeholder={"역할 입력"} onChange={onInputChange}/>
                              </Col>
                                {this.state.error['roleInput'] && <Col sm={2}>
                                    <FormText className={'error'}>역할을 1글자 이상 입력해주세요</FormText>
                                </Col>}
                            </FormGroup>
                        </Form>
                    </div>
                    <div className={'registerButton'}>
                        <button onClick = {onSubmitButton}>등록</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ManagePeopleRegister;