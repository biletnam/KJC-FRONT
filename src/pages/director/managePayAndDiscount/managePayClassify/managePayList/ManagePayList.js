import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './ManagePayList.css';
class ManagePayList extends Component {
    render() {
        const data = this.props.data;
        return (
            <div className={'payListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '결제 방법 구분',
                            accessor: 'PAY_CL_CODE'
                        },
                        {
                            Header: '구분 이름',
                            accessor: 'PAY_CL_CODE_NAME'
                        },
                        {
                            Header: '결제 상세',
                            accessor: 'PAY_DETAIL',
                            Cell: (row) => (
                                <div>
                                    <div>
                                    {row.original.PAY_DETAIL
                                        .map((pd) => {
                                            return (<p>{pd.PAY_DET_CODE_NAME} - {pd.PAY_MODULE_NAME}</p>);
                                        })
                                    }
                                    </div>
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
export default ManagePayList;