import React, { Component } from 'react'
import "./ManagePayDetail.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as payMethod from 'reducers/payMethod';

class ManagePayDetail extends Component {
    emptyInputSetting = {
        nameInput: '',
        selectedClassify: -1,
        moduleInput: ''
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
        const {PayMethodActions} = this.props;
        let noError = true;
        const errorState = {nameInput: false, moduleInput: false, selectedClassify: false};
        if(!data.nameInput || data.nameInput.length < 1) {
            errorState.nameInput = true;
            noError = noError && false;
        }
        if(data.selectedClassify == -1) {
            errorState.selectedClassify = true;
            noError = noError && false;
        }
        if(!data.moduleInput || data.moduleInput.length < 1) {
            errorState.moduleInput = true;
            noError = noError && false;
        }
        if(!noError) {
            this.setState({error: errorState});
            return false;
        }
        const json = {name: this.state.nameInput, moduleName: this.state.moduleInput, payClassifyCode: this.state.selectedClassify};
        PayMethodActions.postPayDetail(json)
            .then((data) => alert('성공'))
            .catch((error) => alert('실패'));
    }
    componentDidMount() {
        const {PayMethodActions} = this.props;
        PayMethodActions.getPayMethod();
    }
    optionChange = (event) => {
        const value = event.target.value;
        this.setState({selectedClassify: value}, () => {console.log(this.state)});
    }
    render() {
        const { onInputChange, onSubmitButton }  = this;
        const payPending = this.props.pending;
        const payMethod = [{PAY_CL_CODE: -1, PAY_CL_CODE_NAME: '선택 안됨'},...this.props.payMethod.data.payMethod];
        return (
            <div className={'payDetailParentDiv'}>
                <div className={'registerTitle'}>
                    결제 상세 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>결제 상세 이름</Label>
                              <Col sm={6}>
                                <Input type="text" name="name" value={this.state.nameInput} id="nameInput" placeholder="결제 상세 이름" onChange={onInputChange} />
                              </Col>
                                {this.state.error['nameInput'] && <Col sm={2}>
                                    <FormText className={'error'}>결제 상세 이름을 입력해주세요</FormText>
                                </Col>}
                            </FormGroup>
                            <FormGroup>
                                <Label for ='classify'>결제 구분</Label>
                                {!payPending && <select value={this.state.selectedClassify} onChange={this.optionChange}>
                                        {payMethod.map((p) => {
                                            return (<option value={p.PAY_CL_CODE} key={p.PAY_CL_CODE}>{p.PAY_CL_CODE_NAME}</option>)
                                        })}
                                     </select>}
                            </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>결제 모듈 이름</Label>
                              <Col sm={6}>
                                <Input type="text" name="module" value={this.state.moduleInput} id="moduleInput" placeholder="결제 모듈 이름" onChange={onInputChange} />
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
                <div>

                </div>
            </div>
        )
    }
}
export default connect((state) => ({payMethod: state.payMethod}), (dispatch) => ({
    PayMethodActions: bindActionCreators(payMethod, dispatch)
}))(ManagePayDetail);