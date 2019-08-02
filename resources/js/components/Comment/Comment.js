import React, { Component } from 'react';

class Comment extends Component {

    render() {
        return(
            <div className="comment">
                <div className="author-wrapper">
                    <a href="#"><img src="https://pp.userapi.com/c834303/v834303529/1a2f00/LYdM358ybhA.jpg?ava=1" alt=""/></a>
                    <div className="author-info">
                        <a href="#" className="text-link author-name">Павел Асетник</a>
                        <p>15 минут назад</p>
                    </div>
                </div>
                <div className="comment-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, cupiditate excepturi facere
                        minima nam quidem quis tempora. Ab ad adipisci aliquid amet asperiores corporis deserunt
                        dignissimos dolorum eaque eveniet explicabo fugiat nam nemo nostrum nulla numquam odit, pariatur
                        possimus quae quos ratione recusandae sapiente sed sunt temporibus, tenetur velit.
                        Voluptatibus.</p>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Comment;
