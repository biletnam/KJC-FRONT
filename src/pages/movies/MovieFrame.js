import React, { Component } from 'react';
import './MovieFrame.css';
import { withRouter } from 'react-router-dom';
import {serverUrl} from "../../reducers/urlUtil";

class  MovieFrame extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps.movie) !== JSON.stringify(this.props.movie);
    }
    render() {
        const {movie, selectMovie, selectMovieInfo, history} = this.props;
        return (
            <div className = "movieFrame">
            <div className="image">
                <img src = {serverUrl + '/' + movie.MOVIE_IMG}/>
            </div>
            <div className="name">
                {movie.MOVIE_NAME}
            </div>
            <div className="buttons">
                <button onClick={() => {selectMovieInfo(movie)}}>정보</button>
                <button onClick={() => {selectMovie(movie)}}>예매하기</button>
            </div>
        </div>
        )
    }

}

export default withRouter(MovieFrame);