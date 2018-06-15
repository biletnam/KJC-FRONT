import React, { Component } from 'react'
import "./ManageRoomRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import ChairRegister from "./chairRegister/ChairRegister";
import ChairRegisterShow from "./chairRegisterShow/ChairRegisterShow";
import {serverUrl} from "../../../../reducers/urlUtil";
import Loader from 'react-loader-spinner';
class ManageRoomRegister extends Component {
    emptyInputSetting = {
        cinemaNumberInput: 1,
        spotInput: 0,
        seatTypeInput: 0,
        floorInput: 1
    }
    loadingSetting = {
        isBranchLoading: false,
        isSeatTypeLoading: false
    }
    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            error: {},
            branch: [],
            seatType: [],
            rowNum: 0,
            rows: [],
            registerPending: false,
            ...this.loadingSetting,
            ...this.emptyInputSetting,
        }
    }
    componentDidMount() {
        this.getBranch();
        this.getSeatType();
    }
    getBranch = () => {
        this.setState({isBranchLoading: true});
        axios.get(serverUrl + '/api/branch')
            .then((response) => {
                console.log(response);
                let spot = 0;
                if(response.data.length > 0) {
                    spot = response.data[0].BRCH_ID;
                }
                this.setState({branch: response.data, spotInput: spot, isBranchLoading: false});
            }).catch((error) => {
            console.log(error);
        });
    }
    getSeatType = () => {
        this.setState({isSeatTypeLoading: true});
        axios.get(serverUrl + '/api/seatType')
            .then((response) => {
                console.log(response);
                let seatType = 0;
                if(response.data.length > 0) {
                    seatType = response.data[0].SEAT_TYPE_ID;
                }
                this.setState({seatType: response.data, seatTypeInput: seatType, isSeatTypeLoading: false});
            }).catch((error) => {
            console.log(error);
        });
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
        const data = {
            cinemaNumber: this.state.cinemaNumberInput,
            rows: this.state.rows,
            branch: this.state.spotInput,
            floor: this.state.floorInput,
            seatType: this.state.seatTypeInput
        }
        if(this.validateInput(data)) {
            return false;
        }
        this.setState({registerPending: true});
        axios.post(`${serverUrl}/api/cinema`, data, { headers: {
            'Content-Type': 'application/json'
        }}).then((response) => {
            console.log(response);
            this.setState({registerPending: false});
            this.setState((state) => ({...this.state, ...this.emptyInputSetting}));
            alert('상영관 등록에 성공하였습니다.');
        }).catch((error) => {
            this.setState({registerPending: false});
            console.log(error);
        });
    }
    validateInput = (data) => {
        let errors = {cinemaNumberInput: false, rows: false, floorInput: false, branchInput: false, seatTypeInput: false}
        if(isNaN(data.cinemaNumber) || data.cinemaNumber < 1 || data.cinemaNumber > 20) {
            errors.cinemaNumberInput = true;
        }else {
           errors.cinemaNumberInput = false;
        }
        (isNaN(data.floor) || data.floor < 1) ? errors.floorInput = true : errors.floorInput = false;
        (isNaN(data.branch) || data.branch < 0) ? errors.branchInput = true : errors.branchInput = false;
        (isNaN(data.seatType) || data.seatType < 0) ? errors.seatTypeInput = true : errors.seatTypeInput = false;
        if(!data.rows || data.rows.length < 1) {
            errors.rows = true;
        }else {
            let totalError = false;
            data.rows.map((r) => {
                if(r.column === 0 || r.column < -1 || isNaN(r.column)) {
                    totalError = totalError || true;
                }
            })
            totalError ? errors.rows = true : errors.rows = false;
        }
        this.setState({error: errors}, () => {console.log(this.state)});
        let isAnyError = false;
        Object.keys(errors).map((key) => {
            isAnyError = isAnyError || errors[key];
        })
        return isAnyError;
    }
    render() {
        const { onInputChange, onSubmitButton }  = this;
        const branchInput = (<Input type="select" value={this.state.spotInput} name="spot" id="spotInput" onChange={onInputChange}>
                                    {this.state.branch.map((b) => {
                                        return <option value={b.BRCH_ID} key={b.BRCH_ID}>{b.BRCH_NAME}</option>
                                    })}
                                </Input>);
        const seatTypeInput = (<Input type="select" value={this.state.seatTypeInput} name="seatType" id="seatTypeInput" onChange={onInputChange}>
                                    {this.state.seatType.map((s) => {
                                        return <option value={s.SEAT_TYPE_ID} key={s.SEAT_TYPE_ID}>{s.SEAT_TYPE_NAME}</option>
                                    })}
                                </Input>);
        return (
            <div className={'manageRoomRegisterParentDiv'}>
                <div className={'registerTitle'}>
                    상영관 등록
                </div>
                <div className={'registerBody'}>
                    <div>
                       <Form className="form">
                            <FormGroup row>
                              <Label for="id" sm={3}>상영관 번호</Label>
                              <Col sm={3}>
                                <Input type="number" name="cinemaNumber" value={this.state.cinemaNumberInput} id="cinemaNumberInput" min={1} max={20} placeholder="상영관 번호" onChange={onInputChange} />
                              </Col>
                                {this.state.error['cinemaNumberInput'] && <Col sm={2}>
                                    <FormText className={'error'}>상영관 번호를 입력해 주세요</FormText>
                                </Col>}
                            </FormGroup>
                            <FormGroup row>
                              <Label for="id" sm={3}>층</Label>
                              <Col sm={3}>
                                <Input type="number" name="floor" value={this.state.floorInput} id="floorInput" min={1} placeholder="층" onChange={onInputChange} />
                              </Col>
                                    {this.state.error['floorInput'] && <Col sm={2}>
                                    <FormText className={'error'}>몇 층인지 입력해주세요.</FormText>
                                </Col>}
                            </FormGroup>
                             <FormGroup row>
                              <Label for="id" sm={3}>지점 선택</Label>
                                 <Col sm={4}>
                                     {this.state.isBranchLoading && <p>지점 불러오는 중...</p>}
                                     {!this.state.isBranchLoading && branchInput}
                               </Col>
                                 {this.state.error['floorInput'] && <Col sm={2}>
                                    <FormText className={'error'}>지점을 확인해주세요.</FormText>
                                </Col>}
                            </FormGroup>
                            <FormGroup row>
                              <Label for="id" sm={3}>전체 좌석 종류</Label>
                              <Col sm={4}>
                                    {this.state.isBranchLoading && <p>좌석 종류 불러오는 중...</p>}
                                    {!this.state.isBranchLoading && seatTypeInput}
                               </Col>
                                {this.state.error['seatTypeInput'] && <Col sm={2}>
                                    <FormText className={'error'}>좌석 종류를 확인해주세요.</FormText>
                                </Col>}
                            </FormGroup>
                           <FormGroup row>
                              <Label for="id" sm={3}>좌석 설정</Label>
                               <Col sm={6}>
                                     <ChairRegister onAddRow = {this.onAddRow} onRowUpdate = {this.onRowUpdate}
                                                    onRowDelete = {this.onRowDelete}
                                                    rows = {this.state.rows}/>
                               </Col>
                               {this.state.error['rows'] && <Col sm={2}>
                                    <FormText className={'error'}>좌석 설정을 확인해주세요. *행은 0보다 큰 숫자여야 합니다.</FormText>
                                </Col>}
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
                        {this.state.registerPending && <Loader
                            type="Circles"
                            color="crimson"
                            height="100"
                            width="100"
                        />}
                        {!this.state.registerPending && <button onClick = {onSubmitButton}>등록</button>}
                    </div>
                </div>
            </div>
        )
    }
}
export default ManageRoomRegister;