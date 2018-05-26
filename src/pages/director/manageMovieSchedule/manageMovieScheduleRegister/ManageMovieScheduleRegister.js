import React, { Component } from 'react'
import "./ManageMovieScheduleRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import ScheduleMovieSearch from "./scheduleMovieSearch/ScheduleMovieSearch";
class ManageMovieScheduleRegister extends Component {
    emptyInputSetting = {
        sequence: 1,
        movie: null,
        room: '',
        date: '',
        startTime: '08:00',
        endTime: '09:30'
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
    onMovieClick = (movie) => {
        this.setState({movie: movie});
    }
    onSubmitButton = (event) => {
        /*        const data = {...this.state};
                let noError = true;
                const errorState = {nameInput: false};
                if(!data.nameInput || data.nameInput.length < 1) {
                    errorState.nameInput = true;
                    noError = noError && false;
                }
                if(!noError) {
                    this.setState({error: errorState});
                    return false;
                }*/
        const json = {sequence: this.state.sequence};
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
            <div className={'movieScheduleRegisterParentDiv'}>
                <div className={'registerTitle'}>
                    상영 일정 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>상영일</Label>
                              <Col sm={6}>
                                <Input type="date" name="date" value={this.state.date} id="date" placeholder="상영일" onChange={onInputChange} />
                              </Col>
                                {this.state.error['nameInput'] && <Col sm={2}>
                                    <FormText className={'error'}>이름을 한글자 이상 입력해 주세요</FormText>
                                </Col>}
                            </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>상영 회차</Label>
                                  <Col sm={6}>
                                    <Input type="number" name="sequence" value={this.state.sequence} min={1} id="sequence" placeholder="상영 회차" onChange={onInputChange} />
                                  </Col>
                               {this.state.error['nameInput'] && <Col sm={2}>
                                        <FormText className={'error'}>이름을 한글자 이상 입력해 주세요</FormText>
                                    </Col>}
                           </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>상영관 선택</Label>
                               <div>
                                   공사중
                               </div>
                           </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>영화 선택</Label>
                              <Col sm={6}>
                                    <ScheduleMovieSearch onMovieClick = {this.onMovieClick}/>
                              </Col>
                               <Col sm={3}>
                                   {this.state.movie &&
                                   <div className={'selectedMovie'}>
                                       <div className={'selectedMovieHeader'}>선택된 영화</div>
                                       <div className={'selectedMovieImage'}><img src={this.state.movie.image}/></div>
                                       <div className={'selectedMovieName'}>{this.state.movie.name}</div>
                                   </div>}
                               </Col>
                           </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>시작 시간</Label>
                                  <Col sm={6}>
                                      <Input type={'time'} value={this.state.startTime}  name="startTime" id="startTime" onChange={onInputChange}/>
                                  </Col>
                               {this.state.error['startTime'] && <Col sm={2}>
                                        <FormText className={'error'}>이름을 한글자 이상 입력해 주세요</FormText>
                                    </Col>}
                           </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>종료 시간</Label>
                                  <Col sm={6}>
                                      <Input type={'time'} value={this.state.endTime}  name="endTime" id="endTime" onChange={onInputChange}/>
                                  </Col>
                               {this.state.error['startTime'] && <Col sm={2}>
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
export default ManageMovieScheduleRegister;