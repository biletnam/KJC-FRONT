import { createAction, handleActions} from 'redux-actions';

const HEADERCHANGE = 'windowSize/HEADERCHANGE';
const MENUTOGGLE = 'windowSize/MENUTOGGLE';

export const headerChange = createAction(HEADERCHANGE, size => size);
export const menuToggle = createAction(MENUTOGGLE);
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
    }
}, initialState)