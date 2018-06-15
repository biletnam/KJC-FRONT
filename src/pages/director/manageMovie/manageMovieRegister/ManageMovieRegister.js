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
import ManageSelectGenere from "./selectGenre/ManageSelectGenre";
import Swal from 'sweetalert2';
import {serverUrl} from "../../../../reducers/urlUtil";
class ManageMovieRegister extends Component {
    fileInput;
    initialInput = {
        nameInput: '',
        imageFIleInput: '',
        informationInput: '',
        runningTimeInput: 0,
        rateInput: 0,
        distInput: '',
        videoAddrInput: ''
    }
    genres = [
        {id: 1, name: '유머'}, {id: 2, name: '로맨스'},
        {id: 3, name: '공포'}, {id:4, name: '역사'}, {id:5, name: '액션'}
    ]
    constructor(props){
        super(props);

        this.state = {
            ...this.state,
            inputs: this.initialInput,
            selectedGenres: [],
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
        formData.append('dist', inputs.distInput);
        formData.append('runningTime', inputs.runningTimeInput);
        formData.append('rate', inputs.rateInput);
        formData.append('videoAddr', inputs.videoAddrInput);
        if(this.state.people.length > 0) {
           this.state.people.map((p) => {
                formData.append('people[]', JSON.stringify(p));
            });
        }
        if(this.state.selectedGenres.length > 0) {
            this.state.selectedGenres.map((g) => {
                formData.append('genre[]', g.name);
            });
        }
        const token = sessionStorage.getItem('kjc_token');
        axios.post(`${serverUrl}/api/movies`, formData, {header: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token
        }}).then((response) => {
            this.fileInput.value = '';
            this.setState({inputs: this.initialInput, selectedGenres: [], people: []});
            Swal({
                title: '등록 성공',
                text: '영화 등록에 성공하였습니다!',
                type: 'success',
                confirmButtonText: '확인',
            });
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
            runningTimeInput: false,
            distInput: false,
            genre: false
        }
        let noError = true;
        if(!inputs.nameInput && inputs.nameInput.length < 1){
            noError = noError && false;
            error.nameInput = true;
        }
        if(!this.fileInput.files || this.fileInput.files.length === 0) {
            noError = noError && false;
            error.imageInput = true;
        }
        if(!this.state.selectedGenres || this.state.selectedGenres.length === 0) {
            noError = noError && false;
            error.genre = true;
        }
        if(!inputs.informationInput && inputs.nameInput.length < 3) {
            noError = noError && false;
            error.imageInput = true;
        }
        if(!inputs.distInput || inputs.distInput.length < 1) {
            noError = noError && false;
            error.distInput = true;
        }
        if(!inputs.runningTimeInput || inputs.runningTimeInput < 1) {
            noError = noError && false;
            error.runningTimeInput = true;
        }
        this.setState({error: error});
        if(noError) {
            return false;
        }

        Swal({
            title: '등록 시도 실패',
            text: '입력을 확인해주세요',
            type: 'error',
            confirmButtonText: '확인',
        });
        return true;
    }
    onPersonClick = (person) => {
        const index = this.state.people.findIndex((p) => p.PER_ID === person.PER_ID);
        if(index !== -1) {
            return false;
        }
        this.setState({people: [...this.state.people, person]});
    }
    onPersonChange = (person) => {
        const index = this.state.people.findIndex((p) => p.PER_ID === person.PER_ID);
        if(index == -1) {
            return false;
        }
        const people = this.state.people;
        people[index] = person;
        this.setState({people: people}, () => {console.log(this.state)});
    }
    onPersonDelete = (person) => {
        this.setState({people: this.state.people.filter((p) => p.PER_ID !== person.PER_ID)});
    }
    onGenreAdd = (gId) => {
        const index = this.state.selectedGenres.findIndex((g) => g.id === gId);
        if(index !== -1) {
            return false;
        }
        const genre = this.genres.find((g) => g.id === Number(gId));
        console.log(genre);
        if(genre) {
            this.setState({selectedGenres: [...this.state.selectedGenres, genre]});
        }
    }
    onGenreDelete = (gId) => {
        console.log('here');
        console.log(gId);
        this.setState({selectedGenres: this.state.selectedGenres.filter((g) => g.id !== Number(gId))});
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
                                <Col sm={3}>
                                    {this.state.error.nameInput && <p>이름을 입력해주세요.</p>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="id" sm={3}>배급사</Label>
                              <Col sm={6}>
                                <Input type="text" value={this.state.inputs.distInput} name="dist" id="distInput" placeholder="배급사" onChange={onInputChange} />
                              </Col>
                                <Col sm={3}>
                                    {this.state.error.distInput && <p>배급사를 입력해주세요.</p>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>영화 이미지</Label>
                              <Col sm={4}>
                                <input type="file" name="imageFile" id="imageFileInput" ref={input => {this.fileInput = input}}/>
                              </Col>
                                <Col sm={3}>
                                    {this.state.error.imageInput && <p>프로필 사진은 필수입니다.</p>}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="exampleSelect" sm={3}>장르</Label>
                               <Col sm={6}>
                                   <ManageSelectGenere genres = {this.genres} selectedGenres={this.state.selectedGenres} onGenreAdd={this.onGenreAdd} onGenreDelete={this.onGenreDelete}/>
                               </Col>
                                <Col sm={3}>
                                    {this.state.error.genre && <p>장르는 필수입니다.</p>}
                                </Col>
                           </FormGroup>
                           <FormGroup row>
                              <Label for="rateSelect" sm={3}>관람 등급</Label>
                               <Col sm={4}>
                                <Input type="select" value={this.state.inputs.rateInput} name="rateSelect" id="rateInput" onChange={onInputChange}>
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
                                      <SelectedPeople people = {this.state.people} personDelete = {this.onPersonDelete} onPersonChange = {this.onPersonChange} />
                                  </div>
                              </Col>
                           </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>영화 정보</Label>
                              <Col sm={6}>
                                  <Input type="textarea" value={this.state.inputs.informationInput} name="information" id="informationInput" placeholder={"영화 정보"} onChange={onInputChange}/>
                              </Col>
                              <Col sm={3}>
                                    {this.state.error.informationInput && <p>영화 정보를 입력해주세요</p>}
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
                              <Col sm={3}>
                                    {this.state.error.runningTimeInput && <p>러닝 타임은 1분 이상이어야 합니다.</p>}
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>영상 주소</Label>
                              <Col sm={4}>
                                  <div className="input-group input-group-sm mb-3">
                                     <Input type="text" value={this.state.inputs.videoAddrInput} name="dist" id="videoAddrInput" placeholder="영상 주소" onChange={onInputChange} />
                                  </div>
                              </Col>
                              <Col sm={3}>
                                    {this.state.error.runningTimeInput && <p>러닝 타임은 1분 이상이어야 합니다.</p>}
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