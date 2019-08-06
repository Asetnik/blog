import React, { Component } from 'react';
import axios from 'axios';
import PostFolded from "../Post/PostFolded/PostFolded";

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: {}
        };
        this.posts = this.posts.bind(this);
    }

    componentWillMount() {
        axios
            .get('/posts')
            .then(response => {
                this.setState({posts: response.data });
            });
    }

    posts() {
        if (this.state.posts instanceof Array) {
            return this.state.posts.map(function (post, index) {
                return <PostFolded
                    key={index}
                    id={post.id}
                    avatar={post.avatar}
                    name={post.name}
                    surname={post.surname}
                    created_at={post.created_at}
                    category={post.category}
                    title={post.title}
                    description={post.description}
                    photo={post.photo}
                    views={post.views}
                />;
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.posts()
                }
            </div>
        );
    }
}

export default PostsList;
