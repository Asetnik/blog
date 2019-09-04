import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Post from "../Post";
import CategoryTile from "../../CategoryTile/CategoryTile";

class PostFolded extends Post {

    constructor(props) {
        super(props);
        this.state = {
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
        return (
            <div className="blog-card post post-folded">
                <div className="head-wrapper">
                    <div className="author-wrapper">
                        <Link to={'/user/' + this.props.post.author.id}><img src={this.props.post.author.photo}
                                                                             alt={this.props.post.author.name + " " + this.props.post.author.surname}/></Link>
                        <div className="author-info">
                            <Link to={'/user/' + this.props.post.author.id}
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
                <div className="read-more-wrapper">
                    <Link to={'/post/' + this.props.post.id}>
                        <button className="btn">Читать полностью</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default PostFolded;
