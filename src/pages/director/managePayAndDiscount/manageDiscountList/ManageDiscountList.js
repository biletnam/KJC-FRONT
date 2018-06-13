import React, { Component } from 'react';
import ReactTable from 'react-table';
import "./ManageDiscountList.css";
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as discount from 'reducers/discount';
class ManageDiscountList extends Component {
    componentDidMount() {
        const {DiscountActions} = this.props;
        DiscountActions.getDiscount();
    }
    render() {
        const data = this.props.discount.data.discount;
        return (
            <div className={'payListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '할인 코드',
                            accessor: 'DISC_CODE'
                        },
                        {
                            Header: '할인 이름',
                            accessor: 'DISC_NAME'
                        },
                        {
                            Header: '할인',
                            Cell: (row) => (
                                <div>
                                    {row.original.DISC_AMT} {row.original.DISC_METHOD}
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
export default connect((state) => ({discount: state.discount}), (dispatch) => ({
    DiscountActions: bindActionCreators(discount, dispatch)
}))(ManageDiscountList);