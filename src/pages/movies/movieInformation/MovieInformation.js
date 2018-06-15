import React, {Component} from 'react'
import './MovieInformation.css';
import { Table } from 'reactstrap';
import {serverUrl} from "../../../reducers/urlUtil";
class MovieInformation extends Component {

    render () {
        const {onCloseModal, selectedMovie} = this.props;
        return (
            <div className={'movie-information-parent-div'}>
                <div className={'movie-information-close'}>
                    <span className={'movie-info-title'}>영화 정보</span> <button onClick={onCloseModal}>X</button>
                </div>
                <div className={'movie-information-body'}>
                    <div>
                        <img src={serverUrl + '/' + selectedMovie.MOVIE_IMG}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default MovieInformation;