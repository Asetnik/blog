import React, { Component } from 'react';

class Comment extends Component {

    render() {
        return(
            <div className="comment">
                <div className="author-wrapper">
                    <a href="#"><img src={this.props.avatar} alt=""/></a>
                    <div className="author-info">
                        <a href="#" className="text-link author-name">{this.props.name + " " + this.props.surname}</a>
                        <p>{this.props.created_at}</p>
                    </div>
                </div>
                <div className="comment-content">
                    <p>{this.props.content}</p>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Comment;
