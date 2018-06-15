import React, { Component } from 'react'
import "./PriceChairRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import {serverUrl} from "../../../../reducers/urlUtil";
class PriceChairRegister extends Component {
    emptyInputSetting = {
        nameInput: '',
        priceInput: ''
    }
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
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
    onSubmitButton = (event) => {
        const data = {...this.state};
        let noError = true;
        const errorState = {nameInput: false, priceInput: false};
        if(!data.nameInput || data.nameInput.length < 1) {
            errorState.nameInput = true;
            noError = noError && false;
        }
        if(!data.priceInput || data.priceInput.length < 1 || Number(data.priceInput) < 0) {
            errorState.priceInput = true;
            noError = noError && false;
        }
        if(!noError) {
            this.setState({error: errorState});
            return false;
        }
        const json = {name: this.state.nameInput, price: this.state.priceInput};
        const token = sessionStorage.getItem('kjc_token');

        axios.post(`${serverUrl}/api/seatType`, json, {headers: {'x-access-token': token}}).then((response) => {
            console.log(response);
            this.setState((state) => ({...this.state, ...this.emptyInputSetting}));
            alert('좌석 종류 등록에 성공하였습니다.');
        }).catch((error) => {
            alert('좌석 종류 등록에 실패하였습니다.');
            console.log(error);
        });
    }
    render() {
        const { onInputChange, onSubmitButton }  = this;
        return (
            <div className={'priceChairRegisterParentDiv'}>
                <div className={'registerTitle'}>
                    좌석 종류 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>가격 이름</Label>
                              <Col sm={6}>
                                <Input type="text" name="name" value={this.state.nameInput} id="nameInput" placeholder="가격 이름" onChange={onInputChange} />
                              </Col>
                                {this.state.error['nameInput'] && <Col sm={2}>
                                    <FormText className={'error'}>이름을 한글자 이상 입력해 주세요</FormText>
                                </Col>}
                            </FormGroup>
                             <FormGroup row>
                              <Label for="id" sm={3}>가격</Label>
                              <Col sm={6}>
                                 <div className="input-group input-group-sm mb-3">
                                       <input aria-label="Small" aria-describedby="inputGroup-sizing-sm" className={'form-control'} min={0} type="number" value={this.state.priceInput} name="price" id="priceInput" onChange={onInputChange}/>
                                                <div className="input-group-append">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">원</span>
                                      </div>
                                  </div>
                              </Col>
                                 {this.state.error['priceInput'] && <Col sm={2}>
                                    <FormText className={'error'}>가격을 한글자 이상 입력해 주세요</FormText>
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
export default PriceChairRegister;