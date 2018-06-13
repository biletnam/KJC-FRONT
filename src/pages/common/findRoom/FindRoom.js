import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as branch from 'reducers/branch';
import * as cinema from 'reducers/cinema';
import './FindRoom.css';
class FindRoom extends Component {
    branch;
    cinema;
    state = {branchCinema: [], branchId: -1, cinemaNo: -1}
    componentDidMount(){
        const {BranchActions, CinemaActions} = this.props;
        BranchActions.getBranch();
        CinemaActions.getCinema();
    }
    branchSelect = (event) => {
        const {onRoomSelect} = this.props;
        const branch = Number(event.target.value);
        const branchCinema = [{CINEMA_NO: -1},...this.cinema.filter((c) => c.BRCH_ID === Number(branch))];
        const defaultCinemaNO = -1;
        this.setState({branchId: branch, branchCinema: branchCinema, cinemaNo: -1}, () => {
            onRoomSelect(this.state.branchId, this.state.cinemaNo);
        });
    }
    cinemaSelect = (event) => {
        const { onRoomSelect } = this.props;
        const cinemaNo = Number(event.target.value);
        this.setState({cinemaNo: cinemaNo}, () => {
            onRoomSelect(this.state.branchId, this.state.cinemaNo);
        });
    }
    render() {
        this.branch = [{BRCH_ID: -1, BRCH_NAME: '선택 안됨'}, ...this.props.branch.data.branch];
        this.cinema = [{CINEMA_NO: -1}, ...this.props.cinema.data.cinema];
        const branchPending = this.props.branch.pending;
        const cinemaPending = this.props.cinema.pending;
        return (
            <div className={'findRoomParentDiv'}>
                <div className={'findSpotDiv'}>
                    {
                        !branchPending && !cinemaPending &&
                            <select value = {this.state.branchId} onChange={this.branchSelect}>
                            {this.branch.map((b) => {
                                return (<option value={b.BRCH_ID} key={b.BRCH_ID}>{b.BRCH_NAME}</option>)
                            })}
                            </select>
                    }
                </div>
                <div className={'findRoomDiv'}>
                    {this.branch && this.state.branchCinema.length > 1 &&
                         <select value = {this.state.cinemaNo} onChange={this.cinemaSelect}>
                             {this.state.branchCinema.map((c) => {
                                 return (<option value={c.CINEMA_NO} key={c.CINEMA_NO}>{c.CINEMA_NO !== -1 && `제 ${c.CINEMA_NO} 상영관`}</option>)
                             })}
                         </select>
                    }
                </div>
            </div>
        )
    }

}

export default connect((state) => ({branch: state.branch, cinema: state.cinema}), (dispatch) => ({
    BranchActions: bindActionCreators(branch, dispatch),
    CinemaActions: bindActionCreators(cinema, dispatch)
}))(FindRoom);
