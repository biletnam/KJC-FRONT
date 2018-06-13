import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const CINEMA_GET_PENDING = 'CINEMA_GET_PENDING';
const CINEMA_GET_SUCCESS = 'CINEMA_GET_SUCCESS';
const CINEMA_GET_FAIL = 'CINEMA_GET_FAIL';

const getCinemaAPI = () => {
    return axios.get(serverUrl + '/api/cinema')
}
export const getCinema = () => dispatch => {
    dispatch({type: CINEMA_GET_PENDING});
    getCinemaAPI()
        .then((response) => {
            dispatch({type: CINEMA_GET_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: CINEMA_GET_FAIL});
    })
}

const initialState = {
    pending: false,
    error: false,
    data: {
        cinema: []
    }
}

export default handleActions({
    [CINEMA_GET_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [CINEMA_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...data, cinema: data
            }
        }
    },
    [CINEMA_GET_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    }
}, initialState)