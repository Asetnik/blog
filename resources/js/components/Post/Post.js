import React, {Component} from 'react';
import TagTile from "../TagTile/TagTile";
import axios from "axios";
import Comment from "../Comment/Comment";

class Post extends Component{

    constructor(props) {
        super(props);
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

    renderComments(comments) {
        if (comments instanceof Array) {
            return comments.map(function (comment, index) {
                return <Comment
                    key={index}
                    comment={comment}
                />;
            })
        }
    }

}

export default Post;
