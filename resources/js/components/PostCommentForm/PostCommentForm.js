import React, { Component } from 'react';
import axios from 'axios';
import {connect} from "react-redux";

class PostCommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: ''
        };
        this.sendComment = this.sendComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
                [event.target.name]: event.target.value
            });
    }

    sendComment(event){
        event.preventDefault();
        axios.post('/api/comment', {
            ...this.state,
            post_id: this.props.post_id,
            author_id: this.props.store.user.id
        })
            .then(response => {
                if(response.status === 200) {
                    this.setState({
                        content: ''
                    });
                    this.props.appendComment(response.data[0]);
                    window.scrollTo(0, document.body.scrollHeight);
                }
            });
    }

    render() {
        return(
            <div className="comment-form">
                <form onSubmit={this.sendComment} className="form-inline comment-form-container">
                    <img src={this.props.store.user.photo} alt="" className="commentator-img"/>
                    <div className="comment-container">
                        <div className="form-group">
                            <textarea rows="1" className="form-control w-100 comment-textarea" value={this.state.content} name="content" onChange={this.handleChange} placeholder="Написать комментарий..." />
                        </div>
                        <div>
                            <button type="submit" className="btn submit-comment"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(PostCommentForm);
