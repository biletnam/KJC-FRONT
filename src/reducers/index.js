import { combineReducers } from 'redux';
import windowSize from './windowSize';
import movies from './movies';
export default combineReducers({
    windowSize,
    movies
});