import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import dotenv from 'dotenv'

import App from './App';
import reducers from './reducers';

dotenv.config();
const store = createStore(reducers, compose(applyMiddleware(thunk)));

console.log("Connecting to server: " + process.env.REACT_APP_HOST_URL)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("root")
);