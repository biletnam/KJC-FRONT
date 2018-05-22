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
                            accessor: 'id'
                        },
                        {
                            Header: "이름",
                            accessor: 'name'
                        },
                        {
                            Header: "인물",
                            columns: [
                                {
                                    Header: "배우",
                                    accessor: "A"
                                },
                                {
                                    Header: "감독",
                                    accessor: "D"
                                }
                            ]
                        },
                        {
                            Header: '장르',
                            accessor:'genre'
                        },
                        {
                            Header: '관람등급',
                            accessor: 'age'
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