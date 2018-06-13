import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const PLAY_TYPE_GET_PENDING = 'PLAY_TYPE_GET_PENDING';
const PLAY_TYPE_GET_SUCCESS = 'PLAY_TYPE_GET_SUCCESS';
const PLAY_TYPE_GET_FAIL = 'PLAY_TYPE_GET_FAIL';

const getPlayTypeAPI = () => {
    return axios.get(serverUrl + '/api/playType')
}
export const getPlayType = () => dispatch => {
    dispatch({type: PLAY_TYPE_GET_PENDING});
    getPlayTypeAPI()
        .then((response) => {
            dispatch({type: PLAY_TYPE_GET_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: PLAY_TYPE_GET_FAIL});
    })
}

const initialState = {
    pending: false,
    error: false,
    data: {
        playType: []
    }
}

export default handleActions({
    [PLAY_TYPE_GET_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [PLAY_TYPE_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...data, playType: data
            }
        }
    },
    [PLAY_TYPE_GET_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    }
}, initialState)