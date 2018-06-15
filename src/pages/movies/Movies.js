import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as movies from 'reducers/movies';
import * as branch from 'reducers/branch';
import MovieFrame from "./MovieFrame";
import './Movies.css';
import ReserveMovieDetail from "../reserve/rserveMovieDetail/ReserveMovieDetail";
import Modal from 'react-modal';
import Loader from 'react-loader-spinner';
import {withRouter} from 'react-router-dom';
import MovieInformation from "./movieInformation/MovieInformation";
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        maxHeight: '90%',
        transform             : 'translate(-50%, -50%)',
        maxWidth: '100%',
        padding: 0,
        zIndex: '99999999'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class Movies extends Component {
    state = {
        modalIsOpen: false,
        movieInfoOpen: false,
        selectedMovie: null
    }
    componentDidMount() {
        const { MoviesActions, BranchActions } = this.props;
        MoviesActions.getPlayingMovies();
        BranchActions.getBranch();
    }
    openModal = () => {
        this.setState({modalIsOpen: true});
    }
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    openMovieInfo = () => {
        this.setState({movieInfoOpen: true});
    }
    closeMovieInfo = () => {
        this.setState({movieInfoOpen: false});
    }
    selectMovie = (movie) => {
        const login = this.props.login.login;
        if(!login) {
            const {history} = this.props;
            history.push('/login');
            return false;
        }
        this.setState({selectedMovie: movie}, () => {
            console.log(movie);
            this.openModal();
        })
    }
    selectMovieInfo = (movie) => {
        this.setState({selectedMovie: movie}, () => {
            console.log(movie);
            this.openMovieInfo();
        })
    }
    render() {
        console.log(this.props);
        const {movies} = this.props.movies.data;
        const { MoviesActions } = this.props;
        const { branch } = this.props.branch.data;
        console.log(branch);
        const branchPending = this.props.branch.pending;
        const moviePending = this.props.movies.pending;
        return (
            <div>
                <div className="page-title">영화</div>
                <div className = "movieParentDiv">
                    {moviePending &&      <Loader
                        type="Circles"
                        color="crimson"
                        height="100"
                        width="100"
                    />}
                    {!moviePending &&  !branchPending && <div>
                        {movies.map((movie) => <MovieFrame movie = {movie} selectMovie = {this.selectMovie} selectMovieInfo = {this.selectMovieInfo} key={movie.MOVIE_ID}/>)}
                    </div>}
                </div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal">
                         <ReserveMovieDetail onCloseModal = {this.closeModal} selectedMovie = {this.state.selectedMovie} branch = {branch}/>
                        </Modal>
                        <Modal
                            isOpen={this.state.movieInfoOpen}
                            onRequestClose={this.closeMovieInfo}
                            style={customStyles}
                            contentLabel={'for movie info'}>
                            <MovieInformation onCloseModal={this.closeMovieInfo} selectedMovie = {this.state.selectedMovie}/>
                        </Modal>
            </div>
        )
    }
}
export default withRouter(connect((state) => ({movies: state.movies, branch: state.branch, login: state.login}), (dispatch) => ({
    MoviesActions: bindActionCreators(movies, dispatch),
    BranchActions: bindActionCreators(branch, dispatch)
}))(Movies));