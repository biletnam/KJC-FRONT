import { combineReducers } from 'redux';
import windowSize from './windowSize';
import movies from './movies';
import people from './people';
import genres from './genre';
import login from './user/login';
export default combineReducers({
    windowSize,
    movies,
    people,
    genres,
    login
});