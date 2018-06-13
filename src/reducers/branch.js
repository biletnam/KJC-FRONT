import axios from 'axios';
import {serverUrl} from "./urlUtil";
import { handleActions } from 'redux-actions';

const BRANCH_GET_PENDING = 'BRANCH_GET_PENDING';
const BRANCH_GET_SUCCESS = 'BRANCH_GET_SUCCESS';
const BRANCH_GET_FAIL = 'BRANCH_GET_FAIL';

const getBranchAPI = () => {
    return axios.get(serverUrl + '/api/branch')
}
export const getBranch = () => dispatch => {
    dispatch({type: BRANCH_GET_PENDING});
    getBranchAPI()
        .then((response) => {
            dispatch({type: BRANCH_GET_SUCCESS, payload: response});
        }).catch((error) => {
        dispatch({type: BRANCH_GET_FAIL});
    })
}

const initialState = {
    pending: false,
    error: false,
    data: {
        branch: []
    }
}

export default handleActions({
    [BRANCH_GET_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [BRANCH_GET_SUCCESS]: (state, action) => {
        const data = action.payload.data;
        return {
            ...state,
            pending: false,
            error: false,
            data: {
                ...data, branch: data
            }
        }
    },
    [BRANCH_GET_FAIL]: (state, action) => {
        return {
            ...state,
            error: true,
            pending: false
        }
    }
}, initialState)