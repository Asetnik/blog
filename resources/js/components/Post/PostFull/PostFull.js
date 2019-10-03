import React, { Component } from 'react';
import CategoryTile from "../../CategoryTile/CategoryTile";
import axios from "axios";
import Post from "../Post";
import Spinner from "../../Spinner/Spinner";
import {Link} from "react-router-dom";

class PostFull extends Post {

    constructor(props) {
        super(props);
        this.state = {
            dataIsLoaded: false,
            commentsIsDisplayed: false,
            post: {},
            dateOptions: {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }
        };
        this.commentDisplayToggle = this.commentDisplayToggle.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/posts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    post: response.data
                }, () => {
                    this.setState({dataIsLoaded: true});
                });
            })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    commentDisplayToggle() {
        if(this.state.post.comments.length > 0) {
            this.setState({
                commentsIsDisplayed: !this.state.commentsIsDisplayed,
            });
        }
    }

    render() {
        const dataIsLoaded = this.state.dataIsLoaded;
        return (
            <div>
                { !dataIsLoaded ? (<Spinner />) : (
                    <div className="blog-card post post-full">
                        <div className="head-wrapper">
                            <div className="author-wrapper">
                                <Link to={'/users/' + this.state.post.author.id}><img src={this.state.post.author.photo} alt=""/></Link>
                                <div className="author-info">
                                    <Link to={'/users/' + this.state.post.author.id} className="text-link author-name">{this.state.post.author.name + " " + this.state.post.author.surname}</Link>
                                    <p>{new Date(this.state.post.created_at).toLocaleString("ru", this.state.dateOptions)}</p>
                                </div>
                            </div>
                            <div className="category-wrapper">
                                <CategoryTile
                                    category_id={this.state.post.category.id}
                                    category={this.state.post.category.category}
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
                                {this.renderPostTags(this.state.post.tags)}
                            </div>
                            <div className="icons-wrapper">
                                <p className="text-link" onClick={this.commentDisplayToggle}><i className="fa fa-comment-o" aria-hidden="true"></i> {this.state.post.comments.length}</p>
                                <p><i className="fa fa-eye" aria-hidden="true"></i> {this.state.post.views}</p>
                            </div>
                        </div>
                        { (this.state.commentsIsDisplayed) &&
                            <div className="comments">
                                <h4>Коментарии</h4>
                                {this.renderComments(this.state.post.comments)}
                            </div>
                        }
                    </div>
                )}
            </div>
        );
    }
}

export default PostFull;
