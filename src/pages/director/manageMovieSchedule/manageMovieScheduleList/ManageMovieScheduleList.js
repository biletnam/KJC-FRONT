import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import './ManageMovieScheduleList.css';
import * as movies from 'reducers/movies';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as schedule from 'reducers/schedule';
import Loader from 'react-loader-spinner';
import Modal from 'react-modal';
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        maxWidth: '100%',
        padding: 0,
        zIndex: '99999999'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class ManageMovieScheduleList extends Component {
    state = {pendingSchedule: -1}
    componentDidMount() {
        const {ScheduleActions} = this.props;
        ScheduleActions.getAllSchedule();
    }
    toPublicClick = (row) => {
        const {ScheduleActions} = this.props;
        this.setState({pendingSchedule:  row.SCHED_ID});
        ScheduleActions.scheduleToPublic(row.SCHED_ID)
            .then((data) => {
                this.setState({pendingSchedule: -1});
                ScheduleActions.getAllSchedule();
                alert('공개 성공');
            })
            .catch((error) => {this.setState({pendingSchedule: -1}); alert('공개 실패');});
    }
    deleteScheduleClick = (data) => {
        if(data.IS_PUBLIC === 'Y') {
            alert('이미 공개된 상영일정은 삭제하실 수 없습니다.');
            return false;
        }
        const {ScheduleActions} = this.props;
        ScheduleActions.deleteSchedule(data.SCHED_ID)
            .then((data) => {
                alert('삭제 성공!');
            }).catch((error) => {
            alert('삭제 실패!');
        })
    }
    render() {
        const data = this.props.schedule.data.schedule || [];
        return (
            <div className={'manageMovieScheduleListDiv'}>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: '일정 ID',
                            accessor: 'SCHED_ID'
                        },
                        {
                          Header:' 영화 이름',
                          accessor: 'MOVIE_NAME'
                        },
                        {
                            Header: "회차",
                            accessor: 'SCHED_NO'
                        },
                        {
                            Header: "상영일",
                            accessor: 'SCHED_DATE'
                        },
                        {
                            Header: '시작 시간',
                            accessor:'PL_START_TIME',
                            Cell: (object) => (<div>{object.value.split('T')[1]}</div>)
                        },
                        {
                            Header: '종료 시간',
                            accessor: 'PL_END_TIME',
                            Cell: (object) => (<div>{object.value.split('T')[1]}</div>)
                        },
                        {
                            Header: '공개 여부',
                            accessor: 'IS_PUBLIC'
                        },
                        {
                            Header: '',
                            Cell: (row) => (
                                <div>
                                    {row.original.SCHED_ID !== this.state.pendingSchedule &&
                                        row.original.IS_PUBLIC !=='Y' &&
                                    <button onClick={() => this.toPublicClick(row.original)}>공개</button>}
                                    {this.state.pendingSchedule === row.original.SCHED_ID && <Loader
                                        type="Circles"
                                        color="crimson"
                                        height="10"
                                        width="10"/>}
                            </div>)
                        },{
                            Header: '',
                            Cell: (row) => (
                                <div>
                                    <button onClick={() => this.deleteScheduleClick(row.original)}>삭제</button>
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
export default connect((state) => ({schedule: state.schedule}), (dispatch) => ({
    ScheduleActions: bindActionCreators(schedule, dispatch)
}))(ManageMovieScheduleList);