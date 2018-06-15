import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './ManageMemberList.css';
import * as customer from 'reducers/user/customer';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

class ManageMemberList extends Component {
    componentDidMount() {
        const {CustomerActions} = this.props;
        CustomerActions.getUsers();
    }
    render() {
        const data = this.props.data.customer || [];
        return (
            <div className={'manageMemberListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '회원 ID',
                            accessor: 'USER_ID'
                        },
                        {
                            Header: '포인트',
                            accessor: 'POINT'
                        },
                        {
                            Header: '주소',
                            accessor: 'ADDR'
                        },
                        {
                            Header: '이메일',
                            accessor: 'EMAIL'
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
                <br />
              </div>
        );
    }
}
export default connect((state) => ({data: state.customer.data}), (dispatch) => ({
    CustomerActions: bindActionCreators(customer, dispatch)
}))(ManageMemberList);