import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './BranchList.css';
import axios from 'axios';
import {serverUrl} from "../../../../reducers/urlUtil";

class BranchList extends Component {
    state = {
        data: []
    }
    componentDidMount() {
      axios.get(serverUrl + '/api/branch')
          .then((response) => {
            console.log(response);
            this.setState({data: response.data});
          }).catch((error) => {
          console.log(error);
      });
    }
    render() {
        return (
            <div className={'branch-list-parent-div'}>
                <ReactTable
                    data={this.state.data}
                    columns={[
                        {
                            Header: '지점 ID',
                            accessor: 'BRCH_ID',
                            maxWidth: '100'
                        },
                        {
                            Header: '지점 이름',
                            accessor: 'BRCH_NAME'
                        },
                        {
                          Header: '우편 번호',
                          accessor: 'ZIP_CODE',
                            maxWidth: '100'
                        },
                        {
                            Header: '지점 주소',
                            accessor: 'ADDR'
                        },
                        {
                            Header: '상세 주소',
                            accessor: 'ADDR_DET',
                            maxWidth: '150'
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
                <br />
              </div>
        );
    }
}
export default BranchList;