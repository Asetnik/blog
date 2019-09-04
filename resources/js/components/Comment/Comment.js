import React, { Component } from 'react';

class Comment extends Component {

    render() {
        return(
            <div className="comment">
                <div className="author-wrapper">
                    <a href="#"><img src={this.props.comment.author.photo} alt=""/></a>
                    <div className="author-info">
                        <a href="#" className="text-link author-name">{this.props.comment.author.name + " " + this.props.comment.author.surname}</a>
                        <p>{this.props.comment.created_at}</p>
                    </div>
                </div>
                <div className="comment-content">
                    <p>{this.props.comment.content}</p>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Comment;
