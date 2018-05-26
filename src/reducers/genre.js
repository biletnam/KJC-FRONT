import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const GENRE_GET_PENDING = 'GENRE_GET_PENDING';
const GENRE_GET_SUCCESS = 'GENRE_GET_SUCCESS';
const GENRE_GET_FAIL = 'GENRE_GET_FAIL';
function getGenreAPI() {
    return  axios.get(serverUrl + '/api/genres');
}
export const getGenres = () => dispatch => {
    dispatch({type: GENRE_GET_PENDING});
    getGenreAPI().then((response) => {
        dispatch({type: GENRE_GET_SUCCESS, payload: response});
    }).catch((error) => {
        dispatch({type: GENRE_GET_FAIL, payload: error});
    })
}

const initialState = {
    pending: false,
    error: false,
    data: {
        genres: []
    }
}

export default handleActions({
    [GENRE_GET_PENDING]: (state, action) => {
        return {
            ...state,
            error: false,
            pending: true
        }
    },
    [GENRE_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            error: false,
            pending: false,
            data: {...data, genres: data}
        }
    },
    [GENRE_GET_FAIL]: (state,action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    }
}, initialState);
