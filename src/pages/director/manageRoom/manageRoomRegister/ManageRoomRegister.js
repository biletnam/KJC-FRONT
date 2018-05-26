import React, { Component } from 'react'
import "./ManageRoomRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import { connect } from 'react-redux';
import * as movies from 'reducers/movies';
import { bindActionCreators} from 'redux';
import ChairRegister from "./chairRegister/ChairRegister";
import ChairRegisterShow from "./chairRegisterShow/ChairRegisterShow";
class ManageRoomRegister extends Component {
    emptyInputSetting = {
        nameInput: '',
        spotInput: 0
    }
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            error: {},
            ...this.emptyInputSetting,
            rowNum: 0,
            rows: []
        }
    }
    onInputChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState({[id]: value}, ()=> {
            console.log(this.state);
        });
    }
    onAddRow = () => {
        const rowId = ++this.state.rowNum;
        const rows = [...this.state.rows];
        const row = {id: rowId, column: 0};
        rows.push(row);
        this.setState({rows: rows});
    }
    onRowUpdate = (row) => {
        const rows = [...this.state.rows];
        const index = rows.findIndex((r) => r.id === row.id);
        rows[index] = row;
        this.setState({rows: rows}, () => { console.log(this.state)});
    }
    onRowDelete = () => {
        const rows = [...this.state.rows];
        rows.pop();
        this.setState({rows: rows, rowNum: rows.length}, () => {console.log(this.state)});
    }
    onSubmitButton = (event) => {
        axios.post('http://localhost:5000/api/people', null, { headers: {
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
        const { onInputChange, onSubmitButton }  = this;
        return (
            <div className={'manageRoomRegisterParentDiv'}>
                <div className={'registerTitle'}>
                    상영관 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>상영관 이름</Label>
                              <Col sm={6}>
                                <Input type="text" name="name" value={this.state.nameInput} id="nameInput" placeholder="상영관 이름" onChange={onInputChange} />
                              </Col>
                                {this.state.error['nameInput'] && <Col sm={2}>
                                    <FormText className={'error'}>이름을 입력해 주세요</FormText>
                                </Col>}
                            </FormGroup>
                             <FormGroup row>
                              <Label for="id" sm={3}>지점 선택</Label>
                              <Col sm={4}>
                                <Input type="select" value={this.state.spotInput} name="spot" id="spotInput" onChange={onInputChange}>
                                <option value={0}>지점 1</option>
                                <option value={1}>지점 2</option>
                                <option value={2}>지점 3</option>
                                <option value={3}>지점 4</option>
                              </Input>
                               </Col>
                            </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>좌석 설정</Label>
                               <Col sm={9}>
                                     <ChairRegister onAddRow = {this.onAddRow} onRowUpdate = {this.onRowUpdate}
                                                    onRowDelete = {this.onRowDelete}
                                                    rows = {this.state.rows}/>
                               </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for={'showChair'} sm={3}>좌석 미리보기</Label>
                                <Col sm={6}>
                                    <ChairRegisterShow rows = {this.state.rows}/>
                                </Col>
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
export default ManageRoomRegister;