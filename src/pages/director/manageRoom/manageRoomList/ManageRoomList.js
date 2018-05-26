import React, { Component } from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './ManageRoomList.css';
import * as people from 'reducers/people'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
class ManageRoomList extends Component {
    componentDidMount() {
        const {PeopleActions} = this.props;
        PeopleActions.getPeople();
    }
    render() {
        const data = this.props.data.people || [];
        return (
            <div className={'manageRoomListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '배우 ID',
                            accessor: 'id',
                            maxWidth: '100'
                        },
                        {
                            Header: "이름",
                            accessor: 'name'
                        },
                        {
                            Header: "사진",
                            accessor: 'picture',
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
export default connect((state) => ({data: state.people.data}), (dispatch) => ({
    PeopleActions: bindActionCreators(people, dispatch)
}))(ManageRoomList);