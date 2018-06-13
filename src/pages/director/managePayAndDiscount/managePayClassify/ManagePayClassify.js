import React, { Component } from 'react'
import "./ManagePayClassify.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ManagePayList from "./managePayList/ManagePayList";
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as payMethod from 'reducers/payMethod';
class ManagePayClassify extends Component {
    emptyInputSetting = {
        nameInput: '',
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
        const {PayMethodActions} = this.props;
        const data = {...this.state};
        let noError = true;
        const errorState = {nameInput: false};
        if(!data.nameInput || data.nameInput.length < 1) {
            errorState.nameInput = true;
            noError = noError && false;
        }
        if(!noError) {
            this.setState({error: errorState});
            return false;
        }
        const json = {name: this.state.nameInput};
        PayMethodActions.postPayClassify(json)
            .then((data) => { PayMethodActions.getPayMethod(); alert('성공'); })
            .catch((error) => {alert('실패')});
    }
    componentDidMount() {
        const {PayMethodActions} = this.props;
        PayMethodActions.getPayMethod();
    }
    render() {
        const { onInputChange, onSubmitButton }  = this;
        const payMethod = this.props.payMethod.data.payMethod;
        return (
            <div className={'payDetailParentDiv'}>
                <div className={'registerTitle'}>
                    결제 구분 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>결제 구분 등록</Label>
                              <Col sm={6}>
                                <Input type="text" name="name" value={this.state.nameInput} id="nameInput" placeholder="결제 상세 이름" onChange={onInputChange} />
                              </Col>
                                {this.state.error['nameInput'] && <Col sm={2}>
                                    <FormText className={'error'}>결제 상세 이름을 입력해주세요</FormText>
                                </Col>}
                            </FormGroup>
                        </Form>
                    </div>
                    <div className={'registerButton'}>
                        <button onClick = {onSubmitButton}>등록</button>
                    </div>
                </div>
                <div>
                    <ManagePayList data = {payMethod}/>
                </div>
            </div>
        )
    }
}
export default connect((state) => ({payMethod: state.payMethod}), (dispatch) => ({
    PayMethodActions: bindActionCreators(payMethod, dispatch)
}))(ManagePayClassify);