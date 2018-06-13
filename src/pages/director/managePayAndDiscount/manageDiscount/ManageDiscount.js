import React, { Component } from 'react'
import "./ManageDiscount.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as discount from 'reducers/discount';

class ManageDiscount extends Component {
    discountMethod = [{id: -1, method: '선택 안됨'}, {id: 1, method: '%'}, {id:2, method: '-'}]
    emptyInputSetting = {
        nameInput: '',
        discountMethod: -1,
        discountAmount: 0
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
        const {DiscountActions} = this.props;
        let noError = true;
        const errorState = {nameInput: false, discountMethod: false, discountAmount: false};
        if(!data.nameInput || data.nameInput.length < 1) {
            errorState.nameInput = true;
            noError = noError && false;
        }
        if(data.discountMethod === -1) {
            errorState.moduleInput = true;
            noError = noError && false;
        }
        if(data.discountAmount < 0) {
            errorState.discountAmount = true;
            noError = noError && false;
        }
        if(!noError) {
            this.setState({error: errorState});
            return false;
        }
        const discountMethod  = this.discountMethod.filter((m) => m.id === Number(this.state.discountMethod))[0].method;
        const json = {name: this.state.nameInput, discountMethod: discountMethod, discountAmount: this.state.discountAmount};
        console.log(json);
        DiscountActions.postDiscount(json)
            .then((data) => alert('성공'))
            .catch((error) => alert('실패'));
    }
    optionChange = (event) =>  {
        const value = event.target.value;
        this.setState({discountMethod: value}, () => console.log(this.state));
    }
    render() {
        const { onInputChange, onSubmitButton }  = this;
        return (
            <div className={'payDetailParentDiv'}>
                <div className={'registerTitle'}>
                    할인 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>할인 등록</Label>
                              <Col sm={6}>
                                <Input type="text" name="name" value={this.state.nameInput} id="nameInput" placeholder="할인 이름" onChange={onInputChange} />
                              </Col>
                                {this.state.error['nameInput'] && <Col sm={2}>
                                    <FormText className={'error'}>할인 이름</FormText>
                                </Col>}
                            </FormGroup>
                            <FormGroup>
                                <Label for ='classify'>할인 방식</Label>
                                   <select value={this.state.discountMethod} onChange={this.optionChange}>
                                        {this.discountMethod.map((m) => {
                                            return (<option value={m.id} key={m.id}>{m.method}</option>)
                                        })}
                                     </select>
                            </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>할인 량</Label>
                              <Col sm={6}>
                                <Input type="number" name="discountAmount" value={this.state.discountAmount} id="discountAmount" placeholder="할인 량" onChange={onInputChange} />
                              </Col>
                               {this.state.error['moduleInput'] && <Col sm={2}>
                                    <FormText className={'error'}>결제 모듈 이름을 입력해주세요</FormText>
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

export default connect((state) => ({discount: state.discount}), (dispatch) => ({
    DiscountActions: bindActionCreators(discount, dispatch)
}))(ManageDiscount);