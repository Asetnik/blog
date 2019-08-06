import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from "../Post";
import CategoryTile from "../../CategoryTile/CategoryTile";

class PostFolded extends Post {

    constructor(props) {
        super(props);
        this.state = {
            numOfComments: 0,
            tags: {}
        };
        this.tags = this.tags.bind(this);
        this.getPostCommentsNumber = this.getPostCommentsNumber.bind(this);
        this.getPostTags = this.getPostTags.bind(this);
    }

    componentWillMount() {
        this.getPostCommentsNumber(this.props.id);
        this.getPostTags(this.props.id);
    }

    render() {
        return (
            <div className="post post-folded">
                <div className="head-wrapper">
                    <div className="author-wrapper">
                        <a href="#"><img src={this.props.avatar} alt={this.props.name + " " + this.props.surname}/></a>
                        <div className="author-info">
                            <a href="#" className="text-link author-name">{this.props.name + " " + this.props.surname}</a>
                            <p>{this.props.created_at}</p>
                        </div>
                    </div>
                    <div className="category-wrapper">
                        <CategoryTile
                            category={this.props.category}
                            category_id={this.props.category_id}
                        />
                    </div>
                </div>
                <div className="post-info">
                    <h3 className="post-title">{this.props.title}</h3>
                    <p className="post-description">{this.props.description}</p>
                    <img src={this.props.photo} alt={this.props.name + " " + this.props.surname} />
                </div>
                <div className="post-footer">
                    <div className="tags-wrapper">
                        {this.tags()}
                    </div>
                    <div className="icons-wrapper">
                        <p><i className="fa fa-comment-o" aria-hidden="true"></i> {this.state.numOfComments}</p>
                    </div>
                </div>
                <div className="read-more-wrapper">
                    <Link to={'/post/' + this.props.id}>
                        <button className="btn">Читать полностью</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default PostFolded;
