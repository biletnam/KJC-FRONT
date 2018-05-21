import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as movies from 'reducers/movies';
import MovieFrame from "./MovieFrame";
import './Movies.css';
class Movies extends Component {
    componentDidMount() {
        const { MoviesActions } = this.props;
        MoviesActions.getMovies();
    }
    render() {
        console.log(this.props);
        const {movies} = this.props.data;
        const { MoviesActions } = this.props;
        return (
            <div>
                <div className="page-title">영화</div>
                <div className = "movieParentDiv">
                    <div>
                        {movies.map((movie) => <MovieFrame movie = {movie} selectMovie = {MoviesActions.selectMovie}  key={movie.id}/>)}
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => ({data: state.movies.data}), (dispatch) => ({
    MoviesActions: bindActionCreators(movies, dispatch)
}))(Movies);