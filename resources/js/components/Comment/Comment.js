import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Comment extends Component {

    render() {
        return(
            <div className="comment">
                <div className="author-wrapper">
                    <Link to={'/users/' + this.props.comment.author.id}><img src={this.props.comment.author.photo} alt=""/></Link>
                    <div className="author-info">
                        <Link to={'/users/' + this.props.comment.author.id} className="text-link author-name">{this.props.comment.author.name + " " + this.props.comment.author.surname}</Link>
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
