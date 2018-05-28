import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './ManageMemberList.css';
import * as genres from 'reducers/genre';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

class ManageMemberList extends Component {
    componentDidMount() {
        const {GenresActions} = this.props;
        GenresActions.getGenres();
    }
    render() {
        const data = this.props.data.genres || [];
        return (
            <div className={'manageMemberListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '회원 ID',
                            accessor: 'id'
                        },
                        {
                            Header: '회원 이름',
                            accessor: 'name'
                        },
                        {
                            Header: '주소',
                            accessor: 'address'
                        },
                        {
                            Header: '전화번호',
                            accessor: 'phone'
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
}))(ManageMemberList);