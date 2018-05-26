import { createAction, handleActions } from 'redux-actions';
import {serverUrl} from "./urlUtil";
import axios from 'axios';

function getPeopleAPI() {
    return axios.get(serverUrl + '/api/people');
}

const GET_PEOPLE_PENDING = 'GET_PEOPLE_PENDING';
const GET_PEOPLE_SUCCESS = 'GET_PEOPLE_SUCCESS';
const GET_PEOPLE_FAIL = 'GET_PEOPLE_FAIL';

export const getPeople = () => dispatch => {
    dispatch({type: GET_PEOPLE_PENDING});
    return getPeopleAPI()
        .then((response) => {
            console.log(response);
            dispatch({type: GET_PEOPLE_SUCCESS, payload: response})
        }).catch((error) => {
            dispatch({type: GET_PEOPLE_FAIL, payload: error})
        })
}

const initialState = {
    pending: false,
    error: false,
    data: {
        people: []
    }
}

export default handleActions({
    [GET_PEOPLE_PENDING]: (state, action) => {
        return {
            ...state,
            error: false,
            pending: true
        }
    },
    [GET_PEOPLE_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            error: false,
            pending: false,
            data: {...data, people: data}
        }
    },
    [GET_PEOPLE_FAIL]: (state,action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    }
}, initialState);
