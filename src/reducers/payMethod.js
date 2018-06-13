import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const PAY_METHOD_GET_PENDING = 'PAY_METHOD_GET_PENDING';
const PAY_METHOD_GET_SUCCESS = 'PAY_METHOD_GET_SUCCESS';
const PAY_METHOD_GET_FAIL = 'PAY_METHOD_GET_FAIL';

const PAY_METHOD_POST_PENDING = 'PAY_METHOD_POST_PENDING';
const PAY_METHOD_POST_SUCCESS = 'PAY_METHOD_POST_SUCCESS';
const PAY_METHOD_POST_FAIL = 'PAY_METHOD_POST_FAIL';

const getPayMethodAPI = () => {
    const token = sessionStorage.getItem('kjc_token');
    return axios.get(serverUrl + '/api/payMethod', {headers: {'x-access-token': token}})
}
export const getPayMethod = () => dispatch => {
    dispatch({type: PAY_METHOD_GET_PENDING});
    getPayMethodAPI()
        .then((response) => {
            dispatch({type: PAY_METHOD_GET_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: PAY_METHOD_GET_FAIL});
    })
}
const postPayClassifyAPI = (payClassifyObject) => {
    const token = sessionStorage.getItem('kjc_token');
    return axios.post(serverUrl + '/api/payMethod/classify', payClassifyObject, {headers: {'x-access-token': token, 'Content-Type': 'application/json'}});
}
const postPayDetailAPI = (payDetailObject) => {
    const token = sessionStorage.getItem('kjc_token');
    return axios.post(serverUrl + '/api/payMethod/detail', payDetailObject, {headers: {'x-access-token': token, 'Content-Type': 'application/json'}});
}
export const postPayClassify = (payClassifyObject) => dispatch => {
    dispatch({type: PAY_METHOD_POST_PENDING});
    return new Promise((resolve, reject) => {
        postPayClassifyAPI(payClassifyObject)
            .then((response) => {
                dispatch({type: PAY_METHOD_POST_SUCCESS});
                resolve('success');
            }).catch((error) => {
            dispatch({type: PAY_METHOD_POST_FAIL});
            reject('fail');
        })
    })
}

export const postPayDetail = (payDetailObject) => dispatch => {
    dispatch({type: PAY_METHOD_POST_PENDING});
    return new Promise((resolve, reject) => {
        postPayDetailAPI(payDetailObject)
            .then((response) => {
                dispatch({type: PAY_METHOD_POST_SUCCESS});
                resolve('success');
            }).catch((error) => {
            dispatch({type: PAY_METHOD_POST_FAIL});
            reject('fail');
        })
    })
}
const initialState = {
    pending: false,
    error: false,
    postPending: false,
    postSuccess: false,
    data: {
        payMethod: []
    }
}

export default handleActions({
    [PAY_METHOD_GET_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [PAY_METHOD_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...state.data, payMethod: data
            }
        }
    },
    [PAY_METHOD_GET_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    },
    [PAY_METHOD_POST_PENDING]: (state, action) => {
        return {...state, error: false, postPending: true, postSuccess: false}
    },
    [PAY_METHOD_POST_SUCCESS]: (state, action) => {
        return {...state, error: false, postPending: false, postSuccess: true}
    },
    [PAY_METHOD_POST_FAIL]: (state, action) => {
        return {...state, error: true, postPending: false, postSuccess: false}
    }
}, initialState)