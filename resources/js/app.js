import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";

import App from './components/App/App';

import EchoLibrary from "laravel-echo";
import Pusher from "pusher-js";

const initialState = {
    user: {},
    isAuth: false
};

function reducer(state = initialState, action){
    switch (action.type) {
        case "LOGIN":
            const pusher = new Pusher('b5b49cafa57d09440d86', {
                cluster: 'eu',
                forceTLS: true
            });

            const channel = pusher.subscribe('channel-user.' + action.data.user.id);
            channel.bind('post-was-commented', function(data) {
                console.log(JSON.stringify(data));
            });

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
