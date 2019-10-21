import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import App from './components/App/App';
import Pusher from "pusher-js";
import Swal from "sweetalert2";

let channelName;
const pusher = new Pusher('b5b49cafa57d09440d86', {
    cluster: 'eu',
    forceTLS: true
});

function subscribePusher(id) {
    channelName = 'channel-user.' + id;
    const channel = pusher.subscribe(channelName);
    channel.bind('post-was-commented', function (data) {
        console.log(data);
        Swal.fire({
            backdrop: false,
            position: 'bottom-end',
            showConfirmButton: false,
            customClass: 'swal-wide',
            html:
                `Добавлен новый комментарий к <a href="/posts/${data.comment.post.id}">публикации</a>` +
                `<div 
                            style="
                                display: grid;
                                grid-template-columns: max-content auto;
                                grid-column-gap: 10px;
                                margin-top: 10px;
                            ">
                            <div>
                                <a href=${'/users/' + data.comment.author.id}>
                                    <img
                                        style="
                                            height: 60px;
                                            width: 60px;
                                            border-radius: 60px;"
                                        src=${data.comment.author.photo} alt=""/>
                                    <p>${data.comment.author.name + (data.comment.surname ? " " + data.comment.surname : "")}</p>
                                </a>
                            </div>
                            <div>
                                <p
                                    style="
                                        font-size: 20px;
                                        text-align: left;
                                        word-break: break-word;
                                ">
                                    ${data.comment.content.length < 100 ? data.comment.content : data.comment.content.substr(0, 100) + "..."}
                                </p>
                            </div>
                        </div>`,
            showCloseButton: true,
            timer: 10000
        });
    });
}

function unsubscribePusher() {
    pusher.unsubscribe(channelName);
}


const initialState = {
    user: {},
    isAuth: false
};

function reducer(state = initialState, action){
    switch (action.type) {
        case "ISAUTH": {
            if(action.data.user && action.data.user.id){
                subscribePusher(action.data.user.id);
            }
            return {
                ...state,
                ...action.data
            };
        }
        case "LOGIN": {
            subscribePusher(action.data.user.id);
            return {
                ...state,
                ...action.data
            };
        }
        case "LOGOUT": {
            unsubscribePusher();
            return {
                ...state,
                user: {},
                isAuth: false
            };
        }
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
