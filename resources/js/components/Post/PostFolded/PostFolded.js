import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from "../Post";
import CategoryTile from "../../CategoryTile/CategoryTile";

class PostFolded extends Post {

    constructor(props) {
        super(props);
        this.state = {
            dataIsLoaded: false,
            numOfComments: 0,
        };
        this.renderPostTags = this.renderPostTags.bind(this);
        this.getPostCommentsNumber = this.getPostCommentsNumber.bind(this);
        this.makeRequests = this.makeRequests.bind(this);
    }

    makeRequests() {
        return new Promise(resolve => {

            this.getPostCommentsNumber(this.props.post.id)
                .then(() => {
                    resolve();
                });
        });
    }

    componentWillMount() {
        this.makeRequests()
            .then(() => {
                this.setState({dataIsLoaded: true});
            });
    }

    render() {
        const dataIsLoaded = this.state.dataIsLoaded;
        return (
            <div>
                { dataIsLoaded && (
                        <div className="post post-folded">
                            <div className="head-wrapper">
                                <div className="author-wrapper">
                                    <a href="#"><img src={this.props.post.avatar} alt={this.props.post.name + " " + this.props.post.surname}/></a>
                                    <div className="author-info">
                                        <a href="#" className="text-link author-name">{this.props.post.name + " " + this.props.post.surname}</a>
                                        <p>{this.props.post.created_at}</p>
                                    </div>
                                </div>
                                <div className="category-wrapper">
                                    <CategoryTile
                                        category={this.props.post.category}
                                        category_id={this.props.post.category_id}
                                    />
                                </div>
                            </div>
                            <div className="post-info">
                                <h3 className="post-title">{this.props.post.title}</h3>
                                <p className="post-description">{this.props.post.description}</p>
                                <img src={this.props.post.photo} alt={this.props.post.name + " " + this.props.post.surname} />
                            </div>
                            <div className="post-footer">
                                <div className="tags-wrapper">
                                    {this.renderPostTags()}
                                </div>
                                <div className="icons-wrapper">
                                    <p><i className="fa fa-comment-o" aria-hidden="true"></i> {this.state.numOfComments}</p>
                                </div>
                            </div>
                            <div className="read-more-wrapper">
                                <Link to={'/post/' + this.props.post.id}>
                                    <button className="btn">Читать полностью</button>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default PostFolded;
