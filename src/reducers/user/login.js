import axios from 'axios';
import {serverUrl} from "../urlUtil";
import { handleActions } from 'redux-actions';
import {checkLogin} from "../loginUtil";

const LOGIN_POST_PENDING = 'LOGIN_POST_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_POST_FAIL = 'LOGIN_POST_FAIL';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_FAIL = 'USER_FAIL';
const LOGIN_INFO_PENDING = 'LOGIN_INFO_PENDING';
const LOGIN_INFO_FAIL = 'LOGIN_INFO_FAIL';
const LOGIN_INFO_SUCCESS = 'LOGIN_INFO_SUCCESS';
const CHECK_LOGIN_PENDING = 'CHECK_LOGIN_PENDING';
const CHECK_LOGIN_FAIL = 'CHECK_LOGIN_FAIL';

function postLoginAPI(id, password) {
    return  axios.post(serverUrl + '/api/login', {id: id, password: password}, { headers: {
        'Content-Type': 'application/json'
    }});
}

export const getLoginUserInformation = () => dispatch => {
    const token = sessionStorage.getItem('kjc_token');
    dispatch({type: LOGIN_INFO_PENDING});
    return new Promise((resolve, reject) => {
        axios.get(serverUrl + '/api/login/info', {headers: {'x-access-token': token}})
            .then((response) =>  {console.log(response);
            dispatch({type: LOGIN_INFO_SUCCESS, payload: response});
            resolve(response.data);
        })
            .catch((error) => {
                console.log(error);
                dispatch({type: LOGIN_INFO_FAIL});
                reject(error);
            })
    })
}

export const loginCheck = () => dispatch => {
    dispatch({type: CHECK_LOGIN_PENDING});
    return new Promise((resolve, reject) => {
        checkLogin().then((data) => {
            console.log('loginSuccess', data);
            dispatch({type:LOGIN_SUCCESS});
            resolve('success');
        }).catch((error) => {if(error === 'noToken') {
            dispatch({type:CHECK_LOGIN_FAIL});
            reject(error);
            return false;
        }});
    })
}

export const postLogin = (id, password) => dispatch => {
    dispatch({type: LOGIN_POST_PENDING});
    postLoginAPI(id,password).then((response) => {
        dispatch({type: LOGIN_SUCCESS, payload: response});
    }).catch((error) => {
        dispatch({type: LOGIN_POST_FAIL, payload: error});
    })
}
const postNonUserLoginAPI = (name, phone) => {
    return axios.post(serverUrl + '/api/login/nonUser', {name: name, phone: phone}, { headers: {
        'Content-Type': 'application/json'
    }});
}
export const postNonUserLogin = (name, phone) => dispatch => {
    dispatch({type: LOGIN_POST_PENDING});
    return new Promise((resolve, reject) => {
        postNonUserLoginAPI(name,phone).then((response) => {
            const token = response.data.token;
            sessionStorage.setItem('kjc_token', token);
            dispatch({type: LOGIN_SUCCESS, payload: response});
            resolve('success');
        }).catch((error) => {
            dispatch({type: LOGIN_POST_FAIL, payload: error});
            reject(error);
        })
    })
}
export const logOut = (history) => dispatch => {
    sessionStorage.removeItem('kjc_token');
    dispatch({type: USER_LOGOUT});
    history.push('/');
}

export const loginSuccess = () => dispatch => {
    dispatch({type:LOGIN_SUCCESS});
}

const initialState = {
    login: false,
    error: false,
    pending: false,
    checkPending: false,
    getInfoPending: false,
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
    [LOGIN_INFO_PENDING]: (state, action) => {return {...state, getInfoPending: true, error: false}},
    [LOGIN_INFO_SUCCESS]: (state, action) => {
        console.log(action);
        return {
            ...state,
            getInfoPending: false,
            error: false,
            userInformation: action.payload.data
        }
    },
    [LOGIN_INFO_FAIL]: (state,action) => {return {...state, getInfoPending: false, error: true}},
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
