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

    renderPostTags(tags) {
        if (tags instanceof Array) {
            return tags.map(function (tag, index) {
                return <TagTile
                    className="tag-wrapper"
                    key={index}
                    tag={tag}
                />;
            })
        }
    }

    comments() {
        if (this.state.comments instanceof Array) {
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
