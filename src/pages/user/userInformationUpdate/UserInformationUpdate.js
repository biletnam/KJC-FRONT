import React, {Component} from 'react';
import Modal from 'react-modal';
import GetPostCode from "../../common/daumGetPost/GetPostCode";
import axios from 'axios';
import Loader from 'react-loader-spinner';
import {Col, Form, FormGroup, Label, Input} from 'reactstrap';
import MaskedInput from 'react-text-mask';
import './UserInformationUpdate.css';
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

class UserInformationUpdate extends Component{
    state = {
        modalIsOpen: false,
        postCode: '',
        jibunAddress: '',
        addressDetail: '',
        emailInput: '',
        identificationNumber: '',
        updatePending: false,
        error: {passwordCheck: false}
    };
    onInputChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState({[id]: value}, ()=> {
            console.log(this.state);
        });
    }
    updateButton = () => {
        console.log('updateButtonClick');
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    openModal = () => {
        this.setState({modalIsOpen: true});
    }
    componentDidMount(){
        const {userInformation} = this.props;
        this.setState({
            postCode: userInformation.ZIP_CODE,
            jibunAddress: userInformation.ADDR,
            addressDetail: userInformation.ADDR_DET ? userInformation.ADDR_DET: '',
            emailInput: userInformation.EMAIL,
            identificationNumber: userInformation.BIRTH,
        })
    }
    render(){
        const {onCloseUpdateModal} = this.props;
        return (
            <div className={'update-user-information-parent-div'}>
                    <div className="page-title">회원 정보 수정 <button onClick={onCloseUpdateModal}>x</button></div>
                    <div className="register-parent-div">
                      <div className="register-form-div">
                          <div className="registerInformation">
                              <p>정보 수정</p>
                          </div>
                          <Form className="form">
                                 <FormGroup row>
                                  <Label for="password" sm={3}>생일</Label>
                                  <Col sm={4}>
                                    <MaskedInput
                                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                        className="form-control"
                                        value={this.state.identificationNumber}
                                        onChange={this.identificationChange}
                                        placeholder="생년월일 -주민등록번호(앞자리)"/>
                                  </Col>
                                     <Col sm={4}>
                                         {this.state.error.birth && <p className={'errorMessage'}>생년월일을 확인해주세요.</p>}
                                     </Col>
                                 </FormGroup>
                                 <FormGroup row>
                                     <Label for="phone" sm={3}>이메일</Label>
                                      <Col sm={4}>
                                        <Input type="email" name="email" id="emailInput" placeholder="이메일"
                                               value={this.state.emailInput} onChange={this.onInputChange}/>
                                      </Col>
                                      <Col sm={3}>
                                         {this.state.error.phone &&
                                         <p className={'errorMessage'}>이메일을 확인하세요, @ 문자가 들어가야 합니다.</p>}
                                      </Col>
                                 </FormGroup>
                                 <div className="form-line">
                                     <div></div>
                                  </div>
                            </Form>
                            <div className={'address-input-div-parent'}>
                                <div className={'address-input-div'}>
                                    <span>우편번호</span><input id={'postCode'} value={this.state.postCode}
                                                            className={'postCode form-control'} disabled={true}/><button
                                    onClick={this.openModal}>검색</button>
                                    {this.state.error.zipCode && <p className={'errorMessage'}>우편번호를 입력해야 합니다.</p>}
                                </div>
                                <div className={'address-input-div'}>
                                    <span>주소</span>
                                    <input id={'bigAddress'} className={'bigAddress form-control'}
                                           value={this.state.jibunAddress} disabled={true}/>
                                </div>
                                <div className={'address-input-div'}>
                                    <span>상세 주소</span>
                                    <input id={'addressDetail'} className={'addressDetail form-control'}
                                           value={this.state.addressDetail} onChange={this.onInputChange}/>
                                    {this.state.error.address_detail && <p className={'errorMessage'}>상세 주소를 입력해주세요</p>}
                                </div>
                            </div>
                          <div className={'register-button-div'}>
                              {!this.state.registerPending && <button onClick={this.updateButton}>수정</button>}
                              {this.state.registerPending && <Loader
                                  type="Puff"
                                  color="#00BFFF"
                                  height="100"
                                  width="100"
                              />}
                          </div>
                      </div>
                    </div>
                     <Modal
                         isOpen={this.state.modalIsOpen}
                         onRequestClose={this.closeModal}
                         style={customStyles}
                         contentLabel="Example Modal">
                            <GetPostCode onClose={this.closeModal} onGetPostCode={this.getPostCode}/>
                     </Modal>
                </div>)
    }
}
export default UserInformationUpdate;