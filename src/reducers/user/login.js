import axios from 'axios';
import {serverUrl} from "../urlUtil";
import { handleActions } from 'redux-actions';

const LOGIN_POST_PENDING = 'LOGIN_POST_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_POST_FAIL = 'LOGIN_POST_FAIL';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_FAIL = 'USER_FAIL';
const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';

function postLoginAPI(id, password) {
    return  axios.post(serverUrl + '/api/login', {id: id, password: password}, { headers: {
        'Content-Type': 'application/json'
    }});
}
export const postLogin = (id, password) => dispatch => {
    dispatch({type: LOGIN_POST_PENDING});
    postLoginAPI(id,password).then((response) => {
        dispatch({type: LOGIN_SUCCESS, payload: response});
    }).catch((error) => {
        dispatch({type: LOGIN_POST_FAIL, payload: error});
    })
}
export const logOut = (history) => dispatch => {
    sessionStorage.removeItem('kjc_token');
    dispatch({type: USER_LOGOUT});
    history.push('/');
}
export const getLoginUserInformation = () => dispatch => {
    const token = sessionStorage.getItem('kjc_token');
    axios.get(serverUrl + '/api/login/info', {headers: {'x-access-token': token}})
        .then((response) =>  {console.log(response); dispatch({type: USER_INFO_SUCCESS, payload: response})})
        .catch((error) => {
            console.log(error);
        })
}
/*export const checkLogin = () => dispatch => {
    const token = localStorage.getItem('kjc_token');
    if(!token) {
        return;
    }
    new Promise((resolve, reject) => {
        axios.get(serverUrl + '/api/login/check', {header: {'x-access-token': token}})
            .then((result) => { resolve(result.data)})
            .catch((error) => {console.log(error)});
    }).catch((error) => {console.log(error)});
}*/
export const loginSuccess = () => dispatch => {
    dispatch({type:LOGIN_SUCCESS});
}

const initialState = {
    login: false,
    error: false,
    pending: false,
    userInformation: {}
}

export default handleActions({
    [LOGIN_POST_PENDING]: (state, action) => {
        return {
            ...state,
            error: false,
            pending: true
        }
    },
    [LOGIN_SUCCESS]: (state, action) => {
        return {
            ...state,
            error: false,
            pending: false,
            login: true
        }
    },
    [LOGIN_POST_FAIL]: (state,action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    },
    [USER_LOGOUT]: (state, action) => {
        return {
            ...state,
            login: false
        }
    },
    [USER_INFO_SUCCESS]: (state, action) => {
        console.log(action);
        return {
            ...state,
            userInformation: action.payload.data
        }
    }
}, initialState);
