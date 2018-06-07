import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './ManageMovieList.css';
import * as movies from 'reducers/movies';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

class ManageMovieList extends Component {
    componentDidMount() {
        const {MoviesActions} = this.props;
        MoviesActions.getMovies();
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
                            maxWidth: '200'
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
                                    <img src ={'http://localhost:5000/' + row.value} style={{width: '100px', height: '100px'}}/>
                              </div>
                            )
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