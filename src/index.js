import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root'
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import 'bootstrap/dist/css/bootstrap.css';
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
const store = configureStore();
ReactDOM.render(<Root store = {store}/>, document.getElementById('root'));
registerServiceWorker();
