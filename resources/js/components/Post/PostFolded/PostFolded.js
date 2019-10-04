import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Post from "../Post";
import CategoryTile from "../../CategoryTile/CategoryTile";
import {connect} from "react-redux";
import axios from "axios";

class PostFolded extends Post {

    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            dateOptions: {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }
        };
    }

    render() {
        if(this.state.isDeleted) {
            return null;
        } else {
            let removePost;
            if(this.props.post.author.id === this.props.store.user.id){
                removePost = event => {
                    event.preventDefault();
                    let id = Number(event.target.parentNode.getAttribute("data-id"));
                    axios.delete('/api/posts/' + id)
                        .then(response => {
                            if(response.status === 200) {
                                this.setState({
                                    isDeleted: true
                                });
                            }
                        });
                };
            }
            return (
                <div className="blog-card post post-folded mb-5">
                    {
                        this.props.post.author.id === this.props.store.user.id && <NavLink to={'/posts/' + this.props.post.id + '/delete'} onClick={removePost} data-id={this.props.post.id} className="post-trash"><i className="fa fa-trash fa-2x" aria-hidden="true"></i></NavLink>
                    }
                    <div className="head-wrapper">
                        <div className="author-wrapper">
                            <Link to={'/users/' + this.props.post.author.id}><img src={this.props.post.author.photo}
                                                                                  alt={this.props.post.author.name + " " + this.props.post.author.surname}/></Link>
                            <div className="author-info">
                                <Link to={'/users/' + this.props.post.author.id}
                                      className="text-link author-name">{this.props.post.author.name + " " + this.props.post.author.surname}</Link>
                                <p>{new Date(this.props.post.created_at).toLocaleString("ru", this.state.dateOptions)}</p>
                            </div>
                        </div>
                        <div className="category-wrapper">
                            <CategoryTile
                                category_id={this.props.post.category.id}
                                category={this.props.post.category.category}
                            />
                        </div>
                    </div>
                    <div className="post-info">
                        <h3 className="post-title">{this.props.post.title}</h3>
                        <p className="post-description">{this.props.post.description}</p>
                        <img src={this.props.post.photo} alt={this.props.post.name + " " + this.props.post.surname}/>
                    </div>
                    <div className="post-footer">
                        <div className="tags-wrapper">
                            {this.renderPostTags(this.props.post.tags)}
                        </div>
                        <div className="icons-wrapper">
                            <p><i className="fa fa-comment-o" aria-hidden="true"></i> {this.props.post.comments.length}</p>
                        </div>
                    </div>
                    <div className="read-more-wrapper mt-3">
                        <Link to={'/posts/' + this.props.post.id}>
                            <button className="btn">Читать полностью</button>
                        </Link>
                    </div>
                </div>
            );
        }
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(PostFolded);
