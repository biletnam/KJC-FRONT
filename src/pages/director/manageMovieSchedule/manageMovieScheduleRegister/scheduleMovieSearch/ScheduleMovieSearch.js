import React, {Component} from 'react';
import './ScheduleMovieSearch.css';
import * as movies from 'reducers/movies';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {serverUrl} from "../../../../../reducers/urlUtil";

class ScheduleMovieSearch extends Component {
    movieDatas;
    componentDidMount() {
        const {MoviesActions} = this.props;
        MoviesActions.getMovies();
    }
    constructor(props) {
        super(props);
        this.state = {searchInput: '', movies: []}
    }
    onChangeSearchInput = (event) => {
        this.setState({searchInput: event.target.value}, () => {
            const searchInput = this.state.searchInput;
            if(searchInput.length === 0 ){
                this.setState({movies: []});
            }else {
                this.setState({movies: this.movieDatas.filter((m) => m.MOVIE_NAME.indexOf(searchInput) !== -1)});
            }
        });
    }
    onMovieClick = (movie) => {
        const { onMovieClick } = this.props;
        onMovieClick(movie);
    }
    render() {
        const { onChangeSearchInput, onMovieClick } = this;
        this.movieDatas =  this.props.data.movies || [];
        return(
            <div className={'scheduleSearchMovieParentDiv'}>
                <div>
                     <input type={'text'} value={this.state.searchInput} onChange={onChangeSearchInput} placeholder={'영화를 검색한뒤 클릭'}/>
                </div>
                <div>
                    {this.state.movies.map((m) => {
                        return (
                            <div className={'searchMovieItem'} onClick={() => onMovieClick(m)} key={m.MOVIE_ID}>
                                <div className={'searchMovieItemImage'}><img src={serverUrl + '/' + m.MOVIE_IMG}/></div>
                                <div className={'searchMovieItemName'}>{m.MOVIE_NAME}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default connect((state) => ({data: state.movies.data}), (dispatch) => ({
    MoviesActions: bindActionCreators(movies, dispatch)
}))(ScheduleMovieSearch);