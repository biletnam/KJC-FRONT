import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as movies from 'reducers/movies';
import * as branch from 'reducers/branch';
import MovieFrame from "./MovieFrame";
import './Movies.css';
import ReserveMovieDetail from "../reserve/rserveMovieDetail/ReserveMovieDetail";
import Modal from 'react-modal';
import {withRouter} from 'react-router-dom';
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

class Movies extends Component {
    state = {
        modalIsOpen: false,
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
                    {moviePending && <p>영화를 불러오는 중입니다...</p>}
                    {!moviePending &&  !branchPending && <div>
                        {movies.map((movie) => <MovieFrame movie = {movie} selectMovie = {this.selectMovie}  key={movie.MOVIE_ID}/>)}
                    </div>}
                </div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                         <ReserveMovieDetail onCloseModal = {this.closeModal} selectedMovie = {this.state.selectedMovie} branch = {branch}/>
                        </Modal>
            </div>
        )
    }
}
export default withRouter(connect((state) => ({movies: state.movies, branch: state.branch, login: state.login}), (dispatch) => ({
    MoviesActions: bindActionCreators(movies, dispatch),
    BranchActions: bindActionCreators(branch, dispatch)
}))(Movies));