import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const SEAT_PENDING = 'SEAT_PENDING';
const SEAT_SUCCESS = 'SEAT_SUCCESS';
const SEAT_FAIL = 'SEAT_FAIL';

const getSeatsByCNOAndBIDAPI = (CNO, BID) => {
    return axios.get(serverUrl + `/api/seats/${CNO}/${BID}`)
}
export const getSeatsByCNOAndBID = (CNO, BID) => dispatch => {
    console.log('call here', CNO, BID);
    dispatch({type: SEAT_PENDING});
    getSeatsByCNOAndBIDAPI(CNO, BID)
        .then((response) => {
            dispatch({type: SEAT_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: SEAT_FAIL});
    })
}

const initialState = {
    pending: false,
    error: false,
    data: {
        seat: []
    }
}

export default handleActions({
    [SEAT_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [SEAT_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...data, seat: data
            }
        }
    },
    [SEAT_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    }
}, initialState)