import { createAction, handleActions} from 'redux-actions';

const HEADERCHANGE = 'windowSize/HEADERCHANGE';
const MENUTOGGLE = 'windowSize/MENUTOGGLE';
const MENUCLOSE = 'windowSize/MENUCLOSE';

export const headerChange = createAction(HEADERCHANGE, size => size);
export const menuToggle = createAction(MENUTOGGLE);
export const menuClose = createAction(MENUCLOSE);
const initialState = {
    header: '50px',
    isOpen: false
}

export default handleActions({
    [HEADERCHANGE]: (state, {payload: size}) => {
        return { ...state, header: size }
    },
    [MENUTOGGLE]: (state) => {
        return { ...state, isOpen: !state.isOpen}
    },
    [MENUCLOSE]: (state) => {
        return {...state, isOpen: false}
    }
}, initialState)