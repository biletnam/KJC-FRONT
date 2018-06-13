import React, { Component } from 'react'
import "./ManageMovieScheduleRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import ScheduleMovieSearch from "./scheduleMovieSearch/ScheduleMovieSearch";
import FindRoom from "../../../common/findRoom/FindRoom";
import {serverUrl} from "../../../../reducers/urlUtil";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playType from 'reducers/playType';
import Loader from 'react-loader-spinner'
class ManageMovieScheduleRegister extends Component {
    emptyInputSetting = {
        sequence: 1,
        movie: null,
        date: '',
        startTime: '08:00',
        endTime: '09:30',
        cinemaNO: -1,
        branchId: -1,
        playTypeId: -1,
        schedulePostPending: false
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
    validate = (object) => {
        const errors = {date: false, movie: false, startTime: false, endTime: false,
            cinemaNO: false, branchId: false, sequence: false, playType: false}
        if(isNaN(new Date(object.date).getTime())) {
            errors.date = true;
        }
        if(object.movieId === -1) {
            errors.movie = true;
        }
        const startTimeDateString = object.date + 'T' + object.startTime;
        const endTimeDataAstring = object.date + 'T' + object.endTime;
        if(!errors.date && isNaN(new Date(startTimeDateString).getTime())) {
            errors.startTime = true;
        }
        if(!errors.date && isNaN(new Date(endTimeDataAstring).getTime())) {
            errors.endTime = true;
        }
        if(object.cinemaNO === -1) {
            errors.cinemaNO = true;
        }
        if(object.branchId === -1) {
            errors.branchId = true;
        }
        if(object.sequence < 1) {
            errors.sequence = true;
        }
        if(object.playTypeId === -1) {
            errors.playType = true;
        }
        let isAnyError = false;
        Object.keys(object).map((key) => isAnyError = isAnyError || errors[key]);
        this.setState({error: errors});
        return isAnyError;
    }
    onSubmitButton = (event) => {
        const object = {
            date: this.state.date,
            movieId: this.state.movie ? this.state.movie.MOVIE_ID: -1,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            cinemaNO: this.state.cinemaNO,
            branchId: this.state.branchId,
            sequence: this.state.sequence,
            playTypeId: this.state.playTypeId
        }
        if(this.validate(object)) {
            return false;
        }
        this.setState({schedulePostPending: true});
        axios.post(serverUrl + '/api/schedule', object, {headers: { 'Content-Type': 'application/json'}})
            .then((response) => {
                this.setState({schedulePostPending: false});
                alert('상영일정 등록이 완료됐습니다.')}
            )
            .catch((error) => { console.log(error.response)
                this.setState({schedulePostPending: false});
                if(error.response && error.response.data) {
                    alert(`상여일정 등록에 실패하였습니다. ${error.response.data}`);
                }else {
                    alert('상영일정 등록에 실패하였습니다.');
                }
            });
    }
    componentDidMount() {
        console.log('didMount');
        const {PlayTypeActions} = this.props;
        PlayTypeActions.getPlayType();
    }
    playTypeOnChange = (event)  => {
        const id = Number(event.target.value);
        this.setState({playTypeId: id}, () => {console.log(this.state)});
    }

    onRoomSelect = (branchId, cinemaNO) => {
        this.setState({branchId: branchId, cinemaNO: cinemaNO}, () => {console.log(this.state)});
    }
    render() {
        const { onInputChange, onSubmitButton, playTypeOnChange}  = this;
        const playTypePending = this.props.playType.pending;
        let playType = [{PT_ID: -1, PT_NAME: '선택 안됨', PT_PRICE: 'x'},...this.props.playType.data.playType];
        return (
            <div className={'movieScheduleRegisterParentDiv'}>
                <div className={'registerTitle'}>
                    상영 일정 등록
                </div>
                <div className={'registerBody'}>
                    {this.state.schedulePostPending && <Loader
                           type="Puff"
                           color="#00BFFF"
                           height="100"
                           width="100"
                       />}
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>상영일</Label>
                              <Col sm={6}>
                                <Input type="date" name="date" value={this.state.date} id="date" placeholder="상영일" onChange={onInputChange} />
                              </Col>
                                {this.state.error['date'] && <Col sm={2}>
                                    <FormText className={'error'}>상영일을 확인해주세요</FormText>
                                </Col>}
                            </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>상영 회차</Label>
                                  <Col sm={6}>
                                    <Input type="number" name="sequence" value={this.state.sequence} min={1} id="sequence" placeholder="상영 회차" onChange={onInputChange} />
                                  </Col>
                               {this.state.error['sequence'] && <Col sm={2}>
                                        <FormText className={'error'}>상영회차를 확인해주세요</FormText>
                                    </Col>}
                           </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>상영 종류</Label>
                                  <Col sm={3}>
                                      {!playTypePending && <select value = {this.state.playTypeId} onChange={playTypeOnChange}>
                                          {playType.map((p) => {
                                              return (<option value={p.PT_ID} key={p.PT_ID}>{`${p.PT_NAME} - ${p.PT_PRICE}`}</option>)
                                          })}
                                      </select>}
                                  </Col>
                                             {this.state.error['sequence'] && <Col sm={2}>
                                        <FormText className={'error'}>상영종류를 확인해주세요</FormText>
                                    </Col>}
                               {this.state.error.playType &&
                                    <Col sm={2}>
                                         <FormText className={'error'}>상영 종류를 선택해 주세요</FormText>
                                    </Col>
                               }
                           </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>상영관 선택</Label>
                               <div>
                                   <Col sm={6}>
                                       <FindRoom onRoomSelect={this.onRoomSelect} />
                                   </Col>
                               </div>
                               {(this.state.error['branchId'] || this.state.error['cinemaNO']) && <Col sm={2}>
                                        <FormText className={'error'}>상영관을 선택해주세요</FormText>
                                    </Col>}
                           </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>영화 선택</Label>
                              <Col sm={6}>
                                    <ScheduleMovieSearch onMovieClick = {this.onMovieClick}/>
                              </Col>
                               {this.state.movie &&
                               <Col sm={3}>
                                   <div className={'selectedMovie'}>
                                       <div className={'selectedMovieHeader'}>선택된 영화</div>
                                       <div className={'selectedMovieImage'}><img
                                           src={serverUrl + '/' + this.state.movie.MOVIE_IMG}/></div>
                                       <div className={'selectedMovieName'}>{this.state.movie.name}</div>
                                   </div>
                               </Col>
                               }
                               {(this.state.error['movie']) && <Col sm={2}>
                                        <FormText className={'error'}>영화를 선택해주세요</FormText>
                                    </Col>}
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
export default connect((state) => ({playType: state.playType}), (dispatch) => ({
  PlayTypeActions: bindActionCreators(playType, dispatch)
}))(ManageMovieScheduleRegister);