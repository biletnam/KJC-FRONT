import { createAction, handleActions } from 'redux-actions';

import axios from 'axios';
import {serverUrl} from "./urlUtil";

function getMoviesAPI() {
    return axios.get(`http://localhost:5000/api/movies`);
}
function getPlayinMovieAPI() {
    return axios.get(serverUrl + '/api/movies/playing');
}
function postMovieAPI(body) {
    return axios.post(`http://localhost:5000/api/movies`, body);
}
const GET_MOVIE_PENDING = 'GET_MOVIE_PENDING';
const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';
const SELECT_RESERVE_MOVIE = 'SELECT_RESERVE_MOVIE';
const POST_MOVIE = 'POST_MOVIE';

const PUT_MOVIE_PENDING = 'PUT_MOVIE_PENDING';
const PUT_MOVIE_SUCCESS = 'PUT_MOVIE_SUCCESS';
const PUT_MOVIE_FAILURE = 'PUT_MOVIE_FAILURE';

export const selectMovie = createAction(SELECT_RESERVE_MOVIE, id => id);
export const getMovies = () => dispatch => {
    dispatch({type: GET_MOVIE_PENDING});

    return getMoviesAPI().then((response) => {
        dispatch({
            type: GET_MOVIE_SUCCESS,
            payload: response
        })
    }).catch(error => {
        dispatch({
            type: GET_MOVIE_FAILURE,
            payload: error
        })
    })
};
export const getPlayingMovies = () => dispatch => {
    dispatch({type: GET_MOVIE_PENDING});

    return getPlayinMovieAPI().then((response) => {
        dispatch({
            type: GET_MOVIE_SUCCESS,
            payload: response
        })
    }).catch(error => {
        dispatch({
            type: GET_MOVIE_FAILURE,
            payload: error
        })
    })
}
export const changePlaying = (movieId, is_playing) => dispatch => {
    const changeValue = is_playing === 'Y' ? 'N' : 'Y';
    dispatch({type: PUT_MOVIE_PENDING});
    return new Promise((resolve, reject) => {
       axios.put(serverUrl + `/api/movies/${movieId}/playing/${changeValue}`)
           .then((data) => {
               dispatch({type: PUT_MOVIE_SUCCESS});
                resolve('success');
           }) .catch((error) => {
           dispatch({type: PUT_MOVIE_FAILURE});
           reject('error');
       })
    });
}
export const postMovie = (body) => dispatch => {
    dispatch({type: POST_MOVIE, state: 'PENDING'});

    return postMovieAPI(body).then((response) => {
        dispatch({
            type: POST_MOVIE,
            state: 'SUCCESS',
            payload: response
        })
    }).catch(error => {
        dispatch({
            type: POST_MOVIE,
            state: 'ERROR',
            payload: error
        })
    })
}

const initialState = {
    pending: false,
    error: false,
    data: {
        wantingReserveMovie: null,
        selectedMovie: null,
        movies: []
    }
}

export default handleActions({
    [GET_MOVIE_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_MOVIE_SUCCESS]: (state, action) => {
        const movies = action.payload.data;
        return {
            ...state,
            pending: false,
            data: {
                ...state.data,
                movies: movies
            }
        }
    },
    [GET_MOVIE_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    },
    [POST_MOVIE]: (state, action) => {
        if(action.state === 'PENDING') {
            return {
                ...state,
                pending: true,
                error: false
            }
        }else if(action.state === 'SUCCESS') {
            return {
                ...state,
                pending: false
            }
        }else if(action.state === 'ERROR') {
            return {
                ...state,
                pending: false,
                error: true
            }
        }
    },
    [SELECT_RESERVE_MOVIE]: (state, {payload: id}) => {
        console.log(id);
        return {
            ...state,
            data: {
                ...state.data,
                selectedMovie: id
            }
        }
    },
    [PUT_MOVIE_PENDING]: (state, action) => {return {...state, pending: true, error: false}},
    [PUT_MOVIE_SUCCESS]: (state, action) => {return {...state, pending: false, error: false}},
    [PUT_MOVIE_FAILURE]: (state, action) => {return {...state, pending: false, error: true}}
}, initialState)