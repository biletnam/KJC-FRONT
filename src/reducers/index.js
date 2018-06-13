import { combineReducers } from 'redux';
import windowSize from './windowSize';
import movies from './movies';
import people from './people';
import genres from './genre';
import login from './user/login';
import cinema from './cinema';
import branch from './branch';
import seatType from './seatType';
import seat from './seat';
import playType from './playType';
import schedule from './schedule';
import bookSeat from './bookSeat';
import ticket from './ticket';
import payMethod from './payMethod';
import discount from './discount';
export default combineReducers({
    windowSize,
    movies,
    people,
    genres,
    login,
    cinema,
    branch,
    seatType,
    seat,
    playType,
    schedule,
    bookSeat,
    ticket,
    payMethod,
    discount
});