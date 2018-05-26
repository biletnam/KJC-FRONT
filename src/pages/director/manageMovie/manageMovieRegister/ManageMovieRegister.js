import React, { Component } from 'react';
import "./ManageMovieRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import MaskedInput from 'react-text-mask';
import { connect } from 'react-redux';
import * as movies from 'reducers/movies';
import { bindActionCreators} from 'redux';
import axios from 'axios';
import SearchPeople from "./searchPeople/SearchPeople";
import SelectedPeople from "./selectedPeople/SelectedPeople";

class ManageMovieRegister extends Component {
    fileInput;
    initialInput = {
        nameInput: '',
        imageFIleInput: '',
        informationInput: '',
        openingDateInput: '',
        runningTimeInput: '',
        minAgeSelectInput: 0
    }
    people = [{id:1, name: '바보'}]
    constructor(props){
        super(props);

        this.state = {
            ...this.state,
            inputs: this.initialInput,
            error: {},
            people: []
        }
        this.fileInput = React.createRef();

    }
    onInputChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState((state) => ({...state, inputs: {...state.inputs, [id]: value}}), ()=> {
            console.log(this.state);
            console.log(this.fileInput.files);
        });
        window.hey = this.state;
    }
    onSubmitButtonClick = () => {
        const inputs = {...this.state.inputs};
        if(this.checkError(inputs)) {
            return false;
        }
        const formData = new FormData();
        formData.append('name', inputs.nameInput);
        formData.append('image', this.fileInput.files[0]);
        formData.append('information', inputs.informationInput);
        formData.append('openingDate', inputs.openingDateInput);
        formData.append('runningTime', inputs.runningTimeInput);
        formData.append('minAge', inputs.minAgeSelectInput);
        axios.post('http://localhost:5000/api/movies', formData, {header: {
            'Content-Type': 'multipart/form-data'
        }}).then((response) => {
            this.fileInput.value = '';
            this.setState({inputs: this.initialInput});
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }
    checkError = (inputs) => {
        const error = {
            nameInput: false,
            imageInput: false,
            informationInput: false,
            openingDateInput: false,
            runningTimeInput: false
        }
        let noError = true;
        if(!inputs.nameInput && inputs.nameInput.length < 2){
            noError = noError && false;
            error.nameInput = true;
        }
        if(!this.fileInput.files || this.fileInput.files.length === 0) {
            noError = noError && false;
            error.imageInput = true;
        }
        if(!inputs.informationInput && inputs.nameInput.length < 3) {
            noError = noError && false;
            error.imageInput = true;
        }
        if(!inputs.openingDateInput && isNaN(new Date(inputs.openingDateInput).getTime())) {
            noError = noError && false;
            error.openingDateInput = true;
        }
        if(!inputs.runningTimeInput && inputs.runningTimeInput === 0) {
            noError = noError && false;
            error.runningTimeInput = true;
        }
        this.setState({error: error});
        if(noError) {
            return false;
        }
        return true;
    }
    onPersonClick = (person) => {
        const index = this.state.people.findIndex((p) => p.id === person.id);
        if(index !== -1) {
            return false;
        }
        this.setState({people: [...this.state.people, person]});
    }
    onPersonUpdate = (person) => {
        const people = [...this.state.people];
        const index = people.findIndex((p) => p.id === person.id);
        people[index] = person;
        this.setState({people: people}, ()=> console.log(this.state));
    }
    onPersonDelete = (person) => {
        this.setState({people: this.state.people.filter((p) => p.id !== person.id)});
    }

    render() {
        const { onInputChange, onPersonClick }  = this;
        return (
            <div className={'manageMovieRegisterParentDiv'}>
                <div className={'registerTitle'}>
                    영화 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>영화 이름</Label>
                              <Col sm={6}>
                                <Input type="text" value={this.state.inputs.nameInput} name="name" id="nameInput" placeholder="영화 이름" onChange={onInputChange} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>영화 이미지</Label>
                              <Col sm={4}>
                                <input type="file" name="imageFile" id="imageFileInput" ref={input => {this.fileInput = input}}/>
                              </Col>
                            </FormGroup>
                           <FormGroup row>
                              <Label for="exampleSelect" sm={3}>관람 등급</Label>
                               <Col sm={4}>
                                <Input type="select" value={this.state.inputs.minAgeSelectInput} name="minAgeSelect" id="minAgeSelectInput" onChange={onInputChange}>
                                <option value={0}>전체 이용가</option>
                                <option value={12}>12세 이상</option>
                                <option value={15}>15세 이상</option>
                                <option value={18}>18세 이상</option>
                              </Input>
                               </Col>
                           </FormGroup>
                              <FormGroup row>
                              <Label for="exampleSelect" sm={3}>인물 추가</Label>
                              <Col sm={8}>
                                  <SearchPeople onPersonClick={onPersonClick}/>
                                  <div className={'selectedPersonParentDiv'}>
                                          <FormText>선택된 인물</FormText>
                                      <SelectedPeople people = {this.state.people} personDelete = {this.onPersonDelete} personUpdate = {this.onPersonUpdate}/>
                                  </div>
                              </Col>
                           </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>영화 정보</Label>
                              <Col sm={8}>
                                  <Input type="textarea" value={this.state.inputs.informationInput} name="information" id="informationInput" placeholder={"영화 정보"} onChange={onInputChange}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>개봉일</Label>
                              <Col sm={4}>
                                  <MaskedInput  mask={[/[1-2]/, /\d/, /\d/,/\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                                value={this.state.inputs.openingDateInput}
                                                className="form-control"
                                                type="text"
                                                name="openingDate"
                                                id="openingDateInput" onChange={onInputChange}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>러닝타임</Label>
                              <Col sm={4}>
                                  <div className="input-group input-group-sm mb-3">
                                       <input aria-label="Small" aria-describedby="inputGroup-sizing-sm" className={'form-control'} type="number" value={this.state.inputs.runningTimeInput} name="runningTime" id="runningTimeInput" onChange={onInputChange}/>
                                                <div className="input-group-append">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">분</span>
                                      </div>
                                  </div>
                              </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className={'registerButton'}>
                        <button onClick={this.onSubmitButtonClick}>등록</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => ({pending: state.pending}), (dispatch) => ({
    MoviesActions: bindActionCreators(movies, dispatch)
}))(ManageMovieRegister);