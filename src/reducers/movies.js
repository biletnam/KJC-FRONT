import { createAction, handleActions } from 'redux-actions';

import axios from 'axios';

function getMoviesAPI() {
    return axios.get(`http://localhost:5000/api/movies`);
}
const GET_MOVIE_PENDING = 'GET_MOVIE_PENDING';
const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';
const SELECT_RESERVE_MOVIE = 'SELECT_RESERVE_MOVIE';

export const selectMovie = createAction(SELECT_RESERVE_MOVIE, id => id);
export const getMovies = () => dispatch => {
    dispatch({type: GET_MOVIE_PENDING});

    return getMoviesAPI().then((response) => {
        console.log('씨발!!');
        console.log(response);
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
    [SELECT_RESERVE_MOVIE]: (state, {payload: id}) => {
        console.log(id);
        return {
            ...state,
            data: {
                ...state.data,
                selectedMovie: id
            }
        }
    }
}, initialState)