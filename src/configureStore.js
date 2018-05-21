import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducers from './reducers';
// another reducers from files


const configureStore = () => {
    const middlewares = [thunk];

    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }
    return createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware( ...middlewares ),
    );
};
export default configureStore;

