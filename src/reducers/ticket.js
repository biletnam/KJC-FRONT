import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const TICKET_GET_PENDING = 'TICKET_GET_PENDING';
const TICKET_GET_SUCCESS = 'TICKET_GET_SUCCESS';
const TICKET_GET_FAIL = 'TICKET_GET_FAIL';

const TICKET_POST_PENDING = 'TICKET_POST_PENDING';
const TICKET_POST_SUCCESS = 'TICKET_POST_SUCCESS';
const TICKET_POST_FAIL = 'TICKET_POST_FAIL';


const TICKET_PUT_PENDING = 'TICKET_PUT_PENDING';
const TICKET_PUT_SUCCESS = 'TICKET_PUT_SUCCESS';
const TICKET_PUT_FAIL = 'TICKET_PUT_FAIL';

const getTicketAPI = () => {
    const token = sessionStorage.getItem('kjc_token');
    return axios.get(serverUrl + '/api/ticket', {headers: {'x-access-token': token}})
}
const getTicketByIdAPI = (id) => {
    const token = sessionStorage.getItem('kjc_token');
    return axios.get(serverUrl + `/api/ticket/${id}`, {headers: {'x-access-token': token}})
}
const getTicketOfAPI = () => {
    const token = sessionStorage.getItem('kjc_token');
    return axios.get(serverUrl + `/api/ticket/of/customer`, {headers: {'x-access-token': token}});
}
export const getTicket = () => dispatch => {
    dispatch({type: TICKET_GET_PENDING});
    getTicketAPI()
        .then((response) => {
            dispatch({type: TICKET_GET_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: TICKET_GET_FAIL});
    })
}
export const getTicketById = (ticketId) => dispatch => {
    dispatch({type: TICKET_GET_PENDING});
    return new Promise((resolve, reject) => {
        getTicketByIdAPI(ticketId)
            .then((response) => {
                dispatch({type: TICKET_GET_SUCCESS, payload: response});
                resolve(response.data);
            }).catch((error) => {
            dispatch({type: TICKET_GET_FAIL});
            reject(error);
        })
    })
}
export const getTicketOf = () => dispatch => {
    dispatch({type: TICKET_GET_PENDING});
    return new Promise((resolve, reject) => {
        getTicketOfAPI()
            .then((response) => {
                dispatch({type: TICKET_GET_SUCCESS, payload: response});
                resolve(response.data);
            }).catch((error) => {
            dispatch({type: TICKET_GET_FAIL});
            reject(error);
        })
    })
}
const postTicketAPI = (ticketObject) => {
    const token = sessionStorage.getItem('kjc_token');
    return axios.post(serverUrl + '/api/ticket', ticketObject, {headers: {'x-access-token': token, 'Content-Type': 'application/json'}});
}
export const postTicket = (ticketObject) => dispatch => {
    dispatch({type: TICKET_POST_PENDING});
    return new Promise((resolve, reject) => {
        postTicketAPI(ticketObject)
            .then((response) => {
                dispatch({type: TICKET_POST_SUCCESS});
                resolve(response.data);
            }).catch((error) => {
            dispatch({type: TICKET_POST_FAIL});
            reject('fail');
        })
    })
}
const putRefundTicketAPI = (TCK_ID) => {
    const token = sessionStorage.getItem('kjc_token');
    const ticketObject = {TCK_ID: TCK_ID};
    return axios.put(serverUrl + '/api/ticket/refund', ticketObject, {headers: {'x-access-token': token, 'Content-Type': 'application/json'}});
}
export const refundTicket = (TCK_ID) => dispatch =>{
    dispatch({type: TICKET_PUT_PENDING});
    return new Promise((resolve, reject) => {
        putRefundTicketAPI(TCK_ID)
            .then((response) => {
                dispatch({type: TICKET_PUT_SUCCESS});
                resolve(response.data);
            }).catch((error) => {
            dispatch({type: TICKET_PUT_FAIL});
            reject('fail');
        })
    })
}
const initialState = {
    pending: false,
    error: false,
    postPending: false,
    postSuccess: false,
    putPending: false,
    putSuccess: false,
    data: {
        ticket: []
    }
}

export default handleActions({
    [TICKET_GET_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [TICKET_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...state.data, ticket: data
            }
        }
    },
    [TICKET_GET_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    },
    [TICKET_POST_PENDING]: (state, action) => {
        return {...state, error: false, postPending: true, postSuccess: false}
    },
    [TICKET_POST_SUCCESS]: (state, action) => {
        return {...state, error: false, postPending: false, postSuccess: true}
    },
    [TICKET_POST_FAIL]: (state, action) => {
        return {...state, error: true, postPending: false, postSuccess: false}
    },
    [TICKET_PUT_PENDING]: (state, action) => {
        return {...state, error: false, putPending: true, putSuccess: false}
    },
    [TICKET_PUT_SUCCESS]: (state, action) => {
        return {...state, error: false, putPending: false, putSuccess: true}
    },
    [TICKET_PUT_FAIL]: (state, action) => {
        return {...state, error: true, putPending: false, putSuccess: false}
    }
}, initialState)