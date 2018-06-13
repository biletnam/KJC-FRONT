import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const SCHEDULE_GET_PENDING = 'SCHEDULE_GET_PENDING';
const SCHEDULE_GET_SUCCESS = 'SCHEDULE_GET_SUCCESS';
const SCHEDULE_GET_FAIL = 'SCHEDULE_GET_FAIL';

const SCHEDULE_PUT_PENDING = 'SCHEDULE_PUT_PENDING';
const SCHEDULE_PUT_SUCCESS = 'SCHEDULE_PUT_SUCCESS';
const SCHEDULE_PUT_FAIL = 'SCHEDULE_PUT_FAIL';

const SCHEDULE_DELETE_PENDING = 'SCHEDULE_DELETE_PENDING';
const SCHEDULE_DELETE_SUCCESS = 'SCHEDULE_DELETE_SUCCESS';
const SCHEDULE_DELETE_FAIL = 'SCHEDULE_DELETE_FAIL';

const getMovieScheduleBetweenDateAPI = (movieId, date1, date2) => {
    return axios.get(serverUrl + `/api/schedule/movie/${movieId}/date/${date1}/${date2}`);
}
const getAllScheduleAPI = () => {
    return axios.get(serverUrl + '/api/schedule');
}
const updateScheduleToPublic = (scheduleId) => {
    return axios.put(serverUrl + `/api/schedule/public/${scheduleId}`);
}
const deleteScheduleAPI = (scheduleId) => {
    return axios.delete(serverUrl + `/api/schedule/${scheduleId}`);
}
export const getMovieScheduleBetweenDate = (movieId, date1, date2) => dispatch => {
    dispatch({type: SCHEDULE_GET_PENDING});
    getMovieScheduleBetweenDateAPI(movieId, date1, date2)
        .then((response) => {
            dispatch({type: SCHEDULE_GET_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: SCHEDULE_GET_FAIL});
    })
}
export const getAllSchedule = () => dispatch => {
    dispatch({type: SCHEDULE_GET_PENDING});
    getAllScheduleAPI()
        .then((response) => {
            dispatch({type: SCHEDULE_GET_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: SCHEDULE_GET_FAIL});
    })
}
export const scheduleToPublic = (scheduleId) => dispatch => {
    dispatch({type: SCHEDULE_PUT_PENDING});
    return new Promise((resolve, reject) => {
        updateScheduleToPublic(scheduleId)
            .then((response) => {
                dispatch({type: SCHEDULE_PUT_SUCCESS});
                resolve('success');
            }).catch((error) => {
            dispatch({type: SCHEDULE_GET_FAIL});
            reject('error');
        })
    })
}

export const deleteSchedule = (scheduleId) => dispatch => {
    dispatch({type: SCHEDULE_DELETE_PENDING});
    return new Promise((resolve, reject) => {
        deleteScheduleAPI(scheduleId)
            .then((response) => {
                dispatch({type: SCHEDULE_DELETE_SUCCESS});
                resolve('success');
            }).catch((error) => {
            dispatch({type: SCHEDULE_DELETE_FAIL});
            reject('error');
        })
    })
}
const initialState = {
    pending: false,
    error: false,
    data: {
        schedule: []
    }
}

export default handleActions({
    [SCHEDULE_GET_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [SCHEDULE_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...state.data, schedule: data
            }
        }
    },
    [SCHEDULE_GET_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    },
    [SCHEDULE_PUT_PENDING]: (state, action) => { return {...state, pending: true, error:false}},
    [SCHEDULE_PUT_SUCCESS]: (state, action) => { return {...state, pending: false, error: false}},
    [SCHEDULE_PUT_FAIL]: (state, action) => {return {...state, pending: false, error: true}},
    [SCHEDULE_DELETE_PENDING]: (state, action) => { return {...state, pending: true, error:false}},
    [SCHEDULE_DELETE_SUCCESS]: (state, action) => { return {...state, pending: false, error: false}},
    [SCHEDULE_DELETE_FAIL]: (state, action) => {return {...state, pending: false, error: true}}
}, initialState)