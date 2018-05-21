import React, { Component } from 'react';
import './MovieFrame.css';
import { withRouter } from 'react-router-dom';
class  MovieFrame extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps.movie) !== JSON.stringify(this.props.movie);
    }
    render() {
        const {movie, selectMovie, history} = this.props;
        return (
            <div className = "movieFrame">
            <div className="image">
                <img src = {movie.image}/>
            </div>
            <div className="name">
                {movie.name}
            </div>
            <div className="buttons"><button onClick={() => {selectMovie(movie.id); history.push('/')}}>예매하기</button></div>
        </div>
        )
    }

}

export default withRouter(MovieFrame);