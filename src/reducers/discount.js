import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const DISCOUNT_GET_PENDING = 'DISCOUNT_GET_PENDING';
const DISCOUNT_GET_SUCCESS = 'DISCOUNT_GET_SUCCESS';
const DISCOUNT_GET_FAIL = 'DISCOUNT_GET_FAIL';

const DISCOUNT_POST_PENDING = 'DISCOUNT_POST_PENDING';
const DISCOUNT_POST_SUCCESS = 'DISCOUNT_POST_SUCCESS';
const DISCOUNT_POST_FAIL = 'DISCOUNT_POST_FAIL';

const getDiscountAPI = () => {
    const token = sessionStorage.getItem('kjc_token');
    return axios.get(serverUrl + '/api/discount', {headers: {'x-access-token': token}})
}
export const getDiscount = () => dispatch => {
    dispatch({type: DISCOUNT_GET_PENDING});
    getDiscountAPI()
        .then((response) => {
            dispatch({type: DISCOUNT_GET_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: DISCOUNT_GET_FAIL});
    })
}
const postDiscountAPI = (discountObject) => {
    const token = sessionStorage.getItem('kjc_token');
    return axios.post(serverUrl + '/api/discount', discountObject, {headers: {'x-access-token': token, 'Content-Type': 'application/json'}});
}

export const postDiscount = (discountObject) => dispatch => {
    dispatch({type: DISCOUNT_POST_PENDING});
    return new Promise((resolve, reject) => {
        postDiscountAPI(discountObject)
            .then((response) => {
                dispatch({type: DISCOUNT_POST_SUCCESS});
                resolve('success');
            }).catch((error) => {
            dispatch({type: DISCOUNT_POST_FAIL});
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
        discount: []
    }
}

export default handleActions({
    [DISCOUNT_GET_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [DISCOUNT_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...state.data, discount: data
            }
        }
    },
    [DISCOUNT_GET_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    },
    [DISCOUNT_POST_PENDING]: (state, action) => {
        return {...state, error: false, postPending: true, postSuccess: false}
    },
    [DISCOUNT_POST_SUCCESS]: (state, action) => {
        return {...state, error: false, postPending: false, postSuccess: true}
    },
    [DISCOUNT_POST_FAIL]: (state, action) => {
        return {...state, error: true, postPending: false, postSuccess: false}
    }
}, initialState)