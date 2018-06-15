import { createAction, handleActions } from 'redux-actions';

import axios from 'axios';
import {serverUrl} from "./urlUtil";

function getPayHistoryAPI() {
    const token = sessionStorage.getItem('kjc_token');
    return axios.get(serverUrl + `/api/payHistory`);
}
function getPayHistoryOfAPI() {
    const token = sessionStorage.getItem('kjc_token');
    return axios.get(serverUrl + '/api/payHistory/of',  {headers: {'x-access-token': token}});
}
function postMovieAPI(body) {
    const token = sessionStorage.getItem('kjc_token');
    return axios.post(serverUrl + `/api/payHistory`, body,  {headers: {'x-access-token': token}});
}
const GET_PAY_HISTORY_PENDING = 'GET_PAY_HISTORY_PENDING';
const GET_PAY_HISTORY_SUCCESS = 'GET_PAY_HISTORY_SUCCESS';
const GET_PAY_HISTORY_FAIL = 'GET_PAY_HISTORY_FAIL';
const POST_PAY_HISTORY = 'POST_PAY_HISTORY';

const PUT_MOVIE_PENDING = 'PUT_MOVIE_PENDING';
const PUT_MOVIE_SUCCESS = 'PUT_MOVIE_SUCCESS';
const PUT_MOVIE_FAILURE = 'PUT_MOVIE_FAILURE';

export const getPayHistory = () => dispatch => {
    dispatch({type: GET_PAY_HISTORY_PENDING});

    return getPayHistoryAPI().then((response) => {
        dispatch({
            type: GET_PAY_HISTORY_SUCCESS,
            payload: response
        })
    }).catch(error => {
        dispatch({
            type: GET_PAY_HISTORY_FAIL,
            payload: error
        })
    })
};
export const getPayHistoryOf = () => dispatch => {
    dispatch({type: GET_PAY_HISTORY_PENDING});

    return getPayHistoryOfAPI().then((response) => {
        dispatch({
            type: GET_PAY_HISTORY_SUCCESS,
            payload: response
        })
    }).catch(error => {
        dispatch({
            type: GET_PAY_HISTORY_FAIL,
            payload: error
        })
    })
}
export const postPayHistory = (body) => dispatch => {
    dispatch({type: POST_PAY_HISTORY, state: 'PENDING'});
    return new Promise((resolve, reject) => {
        return postMovieAPI(body).then((response) => {
            dispatch({
                type: POST_PAY_HISTORY,
                state: 'SUCCESS',
                payload: response
            });
            resolve('success');
        }).catch(error => {
            dispatch({
                type: POST_PAY_HISTORY,
                state: 'ERROR',
                payload: error
            })
            reject('error');
        })
    });
}

const initialState = {
    pending: false,
    error: false,
    data: {
        payHistory: []
    }
}

export default handleActions({
    [GET_PAY_HISTORY_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_PAY_HISTORY_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            data: {
                ...state.data,
                payHistory: data
            }
        }
    },
    [GET_PAY_HISTORY_FAIL]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    },
    [POST_PAY_HISTORY]: (state, action) => {
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
    [PUT_MOVIE_PENDING]: (state, action) => {return {...state, pending: true, error: false}},
    [PUT_MOVIE_SUCCESS]: (state, action) => {return {...state, pending: false, error: false}},
    [PUT_MOVIE_FAILURE]: (state, action) => {return {...state, pending: false, error: true}}
}, initialState)