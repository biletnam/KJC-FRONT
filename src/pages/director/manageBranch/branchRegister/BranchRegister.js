import React, { Component } from 'react'
import "./BranchRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import Modal from 'react-modal';
import GetPostCode from "../../../common/daumGetPost/GetPostCode";

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

class BranchRegister extends Component {
    emptyInputSetting = {
        nameInput: '',
        addressDetail: '',
        postCode: '',
        jibunAddress: ''
    }
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            modalIsOpen: false,
            error: {},
            ...this.emptyInputSetting
        }
    }
    onInputChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState({[id]: value}, ()=> {
            console.log(this.state);
        });
    }
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    openModal = () => {
        this.setState({modalIsOpen: true});
    }
    getPostCode = (postData) => {
        this.setState({postCode: postData.postCode, jibunAddress: postData.jibunAddress})
    }
    onSubmitButton = (event) => {
        const data = {...this.state};
        let noError = true;
        const errorState = {nameInput: false, priceInput: false};
        if(!data.nameInput || data.nameInput.length < 1) {
            errorState.nameInput = true;
            noError = noError && false;
        }
        if(!data.postCode || data.postCode.length < 1) {
            errorState.postCode = true;
            noError = noError && false;
        }
        if(!data.addressDetail || data.addressDetail.length < 1) {
            errorState.address_detail = true;
            noError = noError && false;
        }
        if(!noError) {
            this.setState({error: errorState});
            return false;
        }

        const json = {name: this.state.nameInput, zipCode: this.state.postCode,
            address: this.state.jibunAddress, address_detail: this.state.addressDetail};
        console.log(json);
        axios.post('http://localhost:5000/api/branch', json).then((response) => {
            console.log(response);
            this.setState((state) => ({...this.state, ...this.emptyInputSetting}));
            alert('지점 등록에 성공하였습니다.');
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        const { onInputChange, onSubmitButton }  = this;
        return (
            <div className={'branch-register-parent-div'}>
                <div className={'registerTitle'}>
                    지점 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>지점 이름</Label>
                              <Col sm={6}>
                                <Input type="text" name="name" value={this.state.nameInput} id="nameInput" placeholder="지점 이름" onChange={onInputChange} />
                              </Col>
                                {this.state.error['nameInput'] && <Col sm={2}>
                                    <FormText className={'error'}>이름을 한글자 이상 입력해 주세요</FormText>
                                </Col>}
                            </FormGroup>
                            <FormGroup row>
                                <Label for="zipCode" sm={3}>우편번호</Label>
                                <Col sm={6}>
                                    <div className={'postCodeDiv'}>
                                         <input id={'postCode'} value={this.state.postCode} className={'postCode form-control'} disabled={true}/><button  type='button' onClick={this.openModal}>검색</button>
                                        {this.state.error.postCode &&<p className={'error'}>우편번호를 입력해야 합니다.</p>}
                                    </div>
                                </Col>
                            </FormGroup>
                           <FormGroup row>
                               <Label for={'bigAddress'} sm={3}>주소</Label>
                               <Col sm={6}>
                                   <input id={'bigAddress'} className={'bigAddress form-control'} value={this.state.jibunAddress} disabled={true}/>
                               </Col>
                           </FormGroup>
                           <FormGroup row>
                               <Label for={'addressDetail'} sm={3}>상세 주소</Label>
                               <Col sm={4}>
                                   <input id={'addressDetail'} className={'addressDetail form-control'}  value={this.state.addressDetail} onChange = {this.onInputChange}/>
                                   {this.state.error.addressDetail &&<p className={'error'}>상세 주소를 입력해주세요</p>}
                               </Col>
                           </FormGroup>
                        </Form>
                    </div>
                    <div className={'registerButton'}>
                        <button onClick = {onSubmitButton}>등록</button>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        <GetPostCode onClose={this.closeModal} onGetPostCode = {this.getPostCode}/>
                     </Modal>
                </div>
            </div>
        )
    }
}
export default BranchRegister;