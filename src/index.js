import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root'
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();
ReactDOM.render(<Root store = {store}/>, document.getElementById('root'));
registerServiceWorker();
