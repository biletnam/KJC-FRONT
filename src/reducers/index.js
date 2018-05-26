import { combineReducers } from 'redux';
import windowSize from './windowSize';
import movies from './movies';
import people from './people';
import genres from './genre'
export default combineReducers({
    windowSize,
    movies,
    people,
    genres
});