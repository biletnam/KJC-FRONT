import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const SEAT_TYPE_PENDING = 'SEAT_TYPE_PENDING';
const SEAT_TYPE_SUCCESS = 'SEAT_TYPE_SUCCESS';
const SEAT_TYPE_FAIL = 'SEAT_TYPE_FAIL';

const getSeatTypeAPI = () => {
    return axios.get(serverUrl + '/api/seatType')
}
export const getSeatType = () => dispatch => {
    dispatch({type: SEAT_TYPE_PENDING});
    getSeatTypeAPI()
        .then((response) => {
            dispatch({type: SEAT_TYPE_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: SEAT_TYPE_FAIL});
    })
}

const initialState = {
    pending: false,
    error: false,
    data: {
        seatType: []
    }
}

export default handleActions({
    [SEAT_TYPE_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [SEAT_TYPE_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...data, seatType: data
            }
        }
    },
    [SEAT_TYPE_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    }
}, initialState)