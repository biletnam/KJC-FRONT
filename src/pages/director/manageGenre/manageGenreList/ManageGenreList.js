import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './ManageGenreList.css';
import * as genres from 'reducers/genre';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

class ManageGenreList extends Component {
    componentDidMount() {
        const {GenresActions} = this.props;
        GenresActions.getGenres();
    }
    render() {
        const data = this.props.data.genres || [];
        return (
            <div className={'manageGenreListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '장르 ID',
                            accessor: 'id'
                        },
                        {
                            Header: '이름',
                            accessor: 'name'
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
                <br />
              </div>
        );
    }
}
export default connect((state) => ({data: state.genres.data}), (dispatch) => ({
    GenresActions: bindActionCreators(genres, dispatch)
}))(ManageGenreList);