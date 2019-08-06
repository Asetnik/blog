import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TagTile from "../../TagTile/TagTile";
import axios from 'axios';

class PostFolded extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numOfComments: 0
        }
    }


    componentWillMount() {
        axios
            .get('/api/numofcomments/' + this.props.id)
            .then(response => {
                this.setState({numOfComments: response.data})
            });
        console.log(this.state.numOfComments);
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
                        <span className="badge badge-primary float-right">{this.props.category}</span>
                    </div>
                </div>
                <div className="post-info">
                    <h3 className="post-title">{this.props.title}</h3>
                    <p className="post-description">{this.props.description}</p>
                    <img src={this.props.photo} alt=""/>
                </div>
                <div className="post-footer">
                    <div className="tags-wrapper">
                        <TagTile tagId={1} tagName={'Тэг 1'}/>
                        <TagTile tagId={2} tagName={'Тэг 2'}/>
                        <TagTile tagId={3} tagName={'Тэг 3'}/>
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
