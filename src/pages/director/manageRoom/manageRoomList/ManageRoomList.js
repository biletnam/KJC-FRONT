import React, { Component } from 'react'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './ManageRoomList.css';
import * as cinema from 'reducers/cinema'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

class ManageRoomList extends Component {
    componentDidMount() {
        const {CinemaActions} = this.props;
        CinemaActions.getCinema();
    }
    render() {
        const data = this.props.data.cinema;
        return (
            <div className={'manageRoomListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '상영관 번호',
                            accessor: 'CINEMA_NO',
                            maxWidth: '100'
                        },
                        {
                            Header: "지점 번호",
                            accessor: 'BRCH_ID'
                        },
                        {
                            Header: "층",
                            accessor: 'FLOOR'
                        },
                        {
                            Header: '좌석 갯수',
                            accessor: 'SEAT_CNT'
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"/>
                <br />
              </div>
        );
    }
}
export default connect((state) => ({data: state.cinema.data}), (dispatch) => ({
    CinemaActions: bindActionCreators(cinema, dispatch)
}))(ManageRoomList);