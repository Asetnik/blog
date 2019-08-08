import React, { Component } from 'react';
import axios from 'axios';
import PostFolded from "../Post/PostFolded/PostFolded";
import Spinner from "../Spinner/Spinner";
import Filter from "../Filter/Filter";

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            dataIsLoaded: false
        };
        this.posts = this.posts.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/post')
            .then(response => {
                this.setState({
                    posts: response.data,
                    dataIsLoaded: true
                });
            });
    }

    posts(type) {
        if (this.state.posts instanceof Array) {
            return (<div>
                <Filter type={type}/>
                {
                    this.state.posts.map(function (post, index) {
                        return <PostFolded
                            key={index}
                            id={post.id}
                            avatar={post.avatar}
                            name={post.name}
                            surname={post.surname}
                            created_at={post.created_at}
                            category_id={post.category_id}
                            category={post.category}
                            title={post.title}
                            description={post.description}
                            photo={post.photo}
                            views={post.views}
                        />;
                    })
                }
            </div>);
        }
    }

    render() {
        const dataIsLoaded = this.state.dataIsLoaded;
        return (
            <div>
                {
                    !dataIsLoaded ? (<Spinner />) : (this.posts('default'))
                }
            </div>
        );
    }
}

export default PostsList;
