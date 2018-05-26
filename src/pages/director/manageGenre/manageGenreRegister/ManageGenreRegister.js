import React, { Component } from 'react'
import "./ManageGenreRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
class ManageGenreRegister extends Component {
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
        axios.post('http://localhost:5000/api/genres', json).then((response) => {
            console.log(response);
            this.setState((state) => ({...this.state, ...this.emptyInputSetting}));
            alert('장르 등록에 성공하였습니다.');
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        const { onInputChange, onSubmitButton }  = this;
        return (
            <div className={'manageGenreRegisterParentDiv'}>
                <div className={'registerTitle'}>
                    장르 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>장르 이름</Label>
                              <Col sm={6}>
                                <Input type="text" name="name" value={this.state.nameInput} id="nameInput" placeholder="장르 이름" onChange={onInputChange} />
                              </Col>
                                {this.state.error['nameInput'] && <Col sm={2}>
                                    <FormText className={'error'}>이름을 한글자 이상 입력해 주세요</FormText>
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
export default ManageGenreRegister;