import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const BOOK_SEAT_GET_PENDIG = 'BOOK_SEAT_GET_PENDIG';
const BOOK_SEAT_GET_SUCCESS = 'BOOK_SEAT_GET_SUCCESS';
const BOOK_SEAT_GET_FAIL = 'BOOK_SEAT_GET_FAIL';

const getBookSeatByScheduleIdAPI = (scheduleId) => {
    return axios.get(serverUrl + `/api/book_seat/${scheduleId}`)
}
export const getBookSeatsByScheduleId = (scheduleId) => dispatch => {
    dispatch({type: BOOK_SEAT_GET_PENDIG});
    getBookSeatByScheduleIdAPI(scheduleId)
        .then((response) => {
            dispatch({type: BOOK_SEAT_GET_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: BOOK_SEAT_GET_FAIL});
    })
}

const initialState = {
    pending: false,
    error: false,
    data: {
        bookSeat: []
    }
}

export default handleActions({
    [BOOK_SEAT_GET_PENDIG]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [BOOK_SEAT_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...state.data, bookSeat: data
            }
        }
    },
    [BOOK_SEAT_GET_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    }
}, initialState)