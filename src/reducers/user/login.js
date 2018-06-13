import axios from 'axios';
import {serverUrl} from "../urlUtil";
import { handleActions } from 'redux-actions';
import {checkLogin} from "../loginUtil";

const LOGIN_POST_PENDING = 'LOGIN_POST_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_POST_FAIL = 'LOGIN_POST_FAIL';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_FAIL = 'USER_FAIL';
const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
const CHECK_LOGIN_PENDING = 'CHECK_LOGIN_PENDING';
const CHECK_LOGIN_FAIL = 'CHECK_LOGIN_FAIL';

function postLoginAPI(id, password) {
    return  axios.post(serverUrl + '/api/login', {id: id, password: password}, { headers: {
        'Content-Type': 'application/json'
    }});
}
export const loginCheck = () => dispatch => {
    dispatch({type: CHECK_LOGIN_PENDING});
    checkLogin().then((data) => {
        console.log('loginSuccess', data);
        dispatch({type:LOGIN_SUCCESS});
    }).catch((error) => {if(error === 'noToken') {
        dispatch({type:CHECK_LOGIN_FAIL})
        return false;
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
export const loginSuccess = () => dispatch => {
    dispatch({type:LOGIN_SUCCESS});
}

const initialState = {
    login: false,
    error: false,
    pending: false,
    checkPending: false,
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
            checkPending: false,
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
    },
    [CHECK_LOGIN_PENDING]: (state, action) => {
        return {
            ...state,
            checkPending: true
        }
    },
    [CHECK_LOGIN_FAIL]: (state, action) => {
        return {
            ...state,
            checkPending: false,
            login: false
        }
    }
}, initialState);
