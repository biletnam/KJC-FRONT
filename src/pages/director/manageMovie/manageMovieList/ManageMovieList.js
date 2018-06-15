import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './ManageMovieList.css';
import * as movies from 'reducers/movies';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {serverUrl} from "../../../../reducers/urlUtil";

class ManageMovieList extends Component {
    componentDidMount() {
        const {MoviesActions} = this.props;
        MoviesActions.getMovies();
    }
    onChangePlaying = (data) => {
        const {MoviesActions} = this.props;
        MoviesActions.changePlaying(data.MOVIE_ID, data.IS_PLAYING)
            .then((data) => {MoviesActions.getMovies(); alert('성공')})
            .catch((data) => alert('실패!'));
    }
    render() {
        const data = this.props.data.movies || [];
        return (
            <div className={'manageMovieListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '영화 ID',
                            accessor: 'MOVIE_ID',
                            maxWidth: '100'
                        },
                        {
                            Header: "이름",
                            accessor: 'MOVIE_NAME',
                            maxWidth: '100'
                        },
                        {
                            Header: "인물",
                            accessor: 'PERSON',
                            Cell: row => (
                                <div>
                                    {row.value.map((r) => {
                                        return (<div className={'list-person-div'}>
                                            <div>{r.PER_NAME}</div>
                                            <div>{r.CH_NAME}</div>
                                        </div>)
                                    })}
                              </div>
                            )
                        },
                        {
                            Header: '장르',
                            accessor:'GENRE'
                        },
                        {
                            Header: '관람등급',
                            accessor: 'RATE',
                            Cell: row => (
                                <div>
                                    {row.value === 0 && '전체 이용가'}
                                    {row.value === 12 && '12세 이상'}
                                    {row.value === 15 && '15세 이상'}
                                    {row.value === 18 && '18세 이상'}
                                </div>
                            )
                        },
                        {
                            Header: '포스터',
                            accessor: 'MOVIE_IMG',
                            Cell: row => (
                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        backgroundColor: '#dadada',
                                        borderRadius: '2px'
                                    }}>
                                    <img src ={`${serverUrl}/` + row.value} style={{width: '100px', height: '100px'}}/>
                              </div>
                            )
                        },
                        {
                            Header: '상영중',
                            accessor: 'IS_PLAYING',
                            maxWidth: 100
                        },
                        {
                            Header: '',
                            Cell: (row) => (<div>
                                {row.original.IS_PLAYING !== 'Y' && <button onClick={() => this.onChangePlaying(row.original)}>상영</button>}
                                {row.original.IS_PLAYING === 'Y' && <button onClick={() => this.onChangePlaying(row.original)}>종영</button>}
                            </div>)
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
                <br />
              </div>
        );
    }
}
export default connect((state) => ({data: state.movies.data}), (dispatch) => ({
    MoviesActions: bindActionCreators(movies, dispatch)
}))(ManageMovieList);