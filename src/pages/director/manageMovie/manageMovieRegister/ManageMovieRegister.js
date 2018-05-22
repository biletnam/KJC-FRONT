import React, { Component } from 'react';
import "./ManageMovieRegister.css";
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import MaskedInput from 'react-text-mask';
import { connect } from 'react-redux';
import * as movies from 'reducers/movies';
import { bindActionCreators} from 'redux';

class ManageMovieRegister extends Component {
    constructor(props){
        super(props);
        const input = {
            nameInput: '',
            imageFIleInput: '',
            informationInput: '',
            runningTimeInput: ''
        }
        this.state = {
            ...this.state,
            inputs: input,
            actors: [
                {'name': ''}
            ]
        }
    }
    onInputChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState((state) => ({...state, inputs: {...state.inputs, [id]: value}}), ()=> {
            console.log(this.state);
        });
        window.hey = this.state;
    }

    render() {
        const { onInputChange, state }  = this;
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
                                <Input type="text" name="name" id="nameInput" placeholder="영화 이름" onKeyUp={onInputChange} />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>영화 이미지</Label>
                              <Col sm={4}>
                                <Input type="file" name="imageFile" id="imageFileInput" placeholder="고유번호 4자리" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>영화 정보</Label>
                              <Col sm={8}>
                                  <Input type="textarea" name="information" id="informationInput" placeholder={"영화 정보"} onKeyUp={onInputChange}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>개봉일</Label>
                              <Col sm={4}>
                                  <MaskedInput  mask={[/[1-2]/, /\d/, /\d/,/\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                                className="form-control"
                                                type="text"
                                                name="startDate"
                                                id="startDateInput" onKeyUp={onInputChange}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={3}>러닝타임</Label>
                              <Col sm={4}>
                                  <Input type="text" name="runningTime" id="runningTimeInput" onKeyUp={onInputChange}/>
                              </Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className={'registerButton'}>
                        <button>등록</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => ({pending: state.pending}), (dispatch) => ({
    MoviesActions: bindActionCreators(movies, dispatch)
}))(ManageMovieRegister);