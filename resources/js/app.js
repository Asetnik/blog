import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";

import App from './components/App/App';

const initialState = {
    user: {},
    isAuth: false
};

function reducer(state = initialState, action){
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                ...action.data
            };
        case "LOGOUT":
            return {
                ...state,
                isAuth: false
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
