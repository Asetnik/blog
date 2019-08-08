import React, {Component} from 'react';
import TagTile from "../TagTile/TagTile";
import axios from "axios";
import Comment from "../Comment/Comment";

class Post extends Component{

    constructor(props) {
        super(props);
    }

    getPostCommentsNumber(id) {
        return new Promise((resolve) => {
            axios
                .get('/api/numofcomments/' + id)
                .then(response => {
                    this.setState({numOfComments: response.data});
                    resolve();
                });
        });
    }

    getPostTags(id) {
        return new Promise((resolve) => {
            axios
                .get('/api/getposttags/' + id)
                .then(response => {
                    this.setState({tags: response.data});
                    resolve();
                });
        });
    }

    getPostComments(id){
        return new Promise((resolve) => {
            axios
                .get('/api/getpostcomments/' + id)
                .then(response => {
                    this.setState({comments: response.data});
                    resolve();
                });
        });
    }

    tags() {
        if (this.state.tags instanceof Array) {
            return this.state.tags.map(function (tag, index) {
                return <TagTile
                    className="tag-wrapper"
                    key={index}
                    tagId={tag.id}
                    tagName={tag.tag}
                />;
            })
        }
    }

    comments() {
        if (this.state.tags instanceof Array) {
            return this.state.comments.map(function (comment, index) {
                return <Comment
                    key={index}
                    avatar={comment.avatar}
                    name={comment.name}
                    surname={comment.surname}
                    created_at={comment.created_at}
                    content={comment.content}
                />;
            })
        }
    }

}

export default Post;
