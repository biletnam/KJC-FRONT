import React, { Component } from 'react';
import ReactTable from 'react-table';
import "./PayHistory.css";
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as payHistory from 'reducers/payHistory';
class PayHistory extends Component {
    componentDidMount() {
        const {PayHistoryActions} = this.props;
        PayHistoryActions.getPayHistoryOf();
    }
    render() {
        const data = this.props.payHistory.data.payHistory;
        return (
            <React.Fragment>
            <div className={'pay-information-title'}>결제 정보</div>
            <div className={'pay-information-list-body'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                          Header:'결제 일',
                          accessor: 'PAY_DATE'
                        },
                        {
                            Header: '영화 이름',
                            accessor: 'MOVIE_NAME'
                        },
                        {
                            Header: '좌석 갯수',
                            accessor: 'BOOK_SEAT_CNT'
                        },
                        {
                            Header: '할인 이름',
                            accessor: 'DISC_NAME'
                        },
                        {
                            Header: '결제 방법 상세',
                            accessor: 'PAY_DET_CODE_NAME'
                        },
                        {
                            Header: '사용 포인트',
                            accessor: 'POINT_PAY'
                        },
                        {
                            Header:'적립 포인트',
                            accessor: 'POINT_SAVE'
                        },
                        {
                            Header: '결제 상태',
                            accessor: 'PAY_STATUS'
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
                <br />
              </div>
            </React.Fragment>
        );
    }
}
export default connect((state) => ({payHistory: state.payHistory}), (dispatch) => ({
    PayHistoryActions: bindActionCreators(payHistory, dispatch)
}))(PayHistory);