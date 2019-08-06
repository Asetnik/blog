import React, { Component } from 'react';
import CategoryTile from "../../CategoryTile/CategoryTile";
import axios from "axios";
import Post from "../Post";

class PostFull extends Post {

    constructor(props) {
        super(props);
        this.state = {
            commentsIsDisplayed: false,
            post: {},
            numOfComments: 0,
            tags: {},
            comments: {}
        };
        this.commentDisplayToggle = this.commentDisplayToggle.bind(this);
        this.getPostCommentsNumber = this.getPostCommentsNumber.bind(this);
        this.getPostTags = this.getPostTags.bind(this);
        this.getPostComments = this.getPostComments.bind(this);
        this.tags = this.tags.bind(this);
        this.comments = this.comments.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/post/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    post: response.data[0]
                });
                this.getPostCommentsNumber(this.state.post.id);
                this.getPostTags(this.state.post.id);
                this.getPostComments(this.state.post.id);
            });
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    commentDisplayToggle() {
        if(this.state.numOfComments > 0) {
            this.setState({
                commentsIsDisplayed: !this.state.commentsIsDisplayed,
            });
        }
    }

    render() {
        return (
            <div className="post post-full">
                <div className="head-wrapper">
                    <div className="author-wrapper">
                        <a href="#"><img src={this.state.post.avatar} alt=""/></a>
                        <div className="author-info">
                            <a href="#" className="text-link author-name">{this.state.post.name + " " + this.state.post.surname}</a>
                            <p>{this.state.post.created_at}</p>
                        </div>
                    </div>
                    <div className="category-wrapper">
                        <CategoryTile
                            category_id={this.state.post.category_id}
                            category={this.state.post.category}
                        />
                    </div>
                </div>
                <div className="post-info">
                    <h3 className="post-title">{this.state.post.title}</h3>
                    <p className="post-description">{this.state.post.description}</p>
                    <img src={this.state.post.photo} alt=""/>
                </div>
                <div className="post-content">
                    <p>{this.state.post.content}</p>
                </div>
                <div className="post-footer">
                    <div className="tags-wrapper">
                        {this.tags()}
                    </div>
                    <div className="icons-wrapper">
                        <p className="text-link" onClick={this.commentDisplayToggle}><i className="fa fa-comment-o" aria-hidden="true"></i> {this.state.numOfComments}</p>
                        <p><i className="fa fa-eye" aria-hidden="true"></i> {this.state.post.views}</p>
                    </div>
                </div>
                { (this.state.commentsIsDisplayed) &&
                    <div className="comments">
                        <h4>Коментарии</h4>
                        {this.comments()}
                    </div>
                }
            </div>
        );
    }
}

export default PostFull;
