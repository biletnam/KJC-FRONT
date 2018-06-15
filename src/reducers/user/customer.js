import axios from 'axios';
import {serverUrl} from "../urlUtil";
import { handleActions } from 'redux-actions';
import {checkLogin} from "../loginUtil";

const CUSTOMER_GET_PENDING = 'CUSTOMER_GET_PENDING';
const CUSTOMER_GET_SUCCESS = 'CUSTOMER_GET_SUCCESS';
const CUSTOMER_GET_FAIL = 'CUSTOMER_GET_FAIL';

function getUsersAPI() {
    const token = sessionStorage.getItem('kjc_token');
    return  axios.get(serverUrl + '/api/customer/users', { headers: {
        'Content-Type': 'application/json', 'x-access-token': token
    }});
}

export const getUsers = () => dispatch => {
    const token = sessionStorage.getItem('kjc_token');
    dispatch({type: CUSTOMER_GET_PENDING});
    getUsersAPI()
        .then((response) =>  {console.log(response); dispatch({type: CUSTOMER_GET_SUCCESS, payload: response})})
        .catch((error) => {
            console.log(error);
            dispatch({type: CUSTOMER_GET_FAIL});
        })
}


const initialState = {
    login: false,
    error: false,
    pending: false,
    data: {
        customer: []
    }
}

export default handleActions({
    [CUSTOMER_GET_PENDING]: (state, action) => {
        return {
            ...state,
            error: false,
            pending: true
        }
    },
    [CUSTOMER_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            error: false,
            pending: false,
            login: true,
            data: {...state.data, customer: data}
        }
    },
    [CUSTOMER_GET_FAIL]: (state,action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    }
}, initialState);
