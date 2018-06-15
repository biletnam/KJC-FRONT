import React, { Component } from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './ManagePeopleList.css';
import * as people from 'reducers/people'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {serverUrl} from "../../../../reducers/urlUtil";
class ManagePeopleList extends Component {
    componentDidMount() {
        const {PeopleActions} = this.props;
        PeopleActions.getPeople();
    }
    render() {
        const data = this.props.data.people || [];
        return (
            <div className={'managePeopleListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '배우 ID',
                            accessor: 'PER_ID',
                            maxWidth: '100'
                        },
                        {
                            Header: "이름",
                            accessor: 'PER_NAME'
                        },
                        {
                            Header: '역할',
                            accessor: 'ROLE'
                        },
                        {
                            Header: "사진",
                            accessor: 'PER_IMG',
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
}))(ManagePeopleList);