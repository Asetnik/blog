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
            filteredPosts: [],
            categoryFilter: [],
            authorFilter: [],
            dataIsLoaded: false
        };
        this.posts = this.posts.bind(this);
        this.updateCategoryFilter = this.updateCategoryFilter.bind(this);
        this.updateAuthorFilter = this.updateAuthorFilter.bind(this);
        this.filterPosts = this.filterPosts.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/post')
            .then(response => {
                this.setState({
                    posts: response.data,
                    filteredPosts: response.data,
                    dataIsLoaded: true
                });
            });
    }

    updateCategoryFilter(value) {
        this.setState({categoryFilter: value}, () => {
            this.filterPosts();
        });
    }

    updateAuthorFilter(value) {
        this.setState({authorFilter: value}, () => {
            this.filterPosts();
        });
    }

    filterPosts() {
        let filteredPosts = this.state.posts;

        if(this.state.categoryFilter.length > 0) {
            filteredPosts = filteredPosts.filter(post => {
                for(let i = 0; i < this.state.categoryFilter.length; i++) {
                    if(post.category === this.state.categoryFilter[i]) return true;
                }
                return false;
            });
        }

        if(this.state.authorFilter.length > 0) {
            filteredPosts = filteredPosts.filter(post => {
                let authorFullName = post.name + " " + post.surname;
                for(let i = 0; i < this.state.authorFilter.length; i++) {
                    if(authorFullName === this.state.authorFilter[i]) return true;
                }
                return false;
            });
        }

        this.setState({filteredPosts: filteredPosts});
    }

    posts() {
        if (this.state.filteredPosts instanceof Array) {
            return (<div>
                {
                    this.state.filteredPosts.map(function (post, index) {
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
                <Filter
                    type={'default'}
                    updateCategoryFilter={this.updateCategoryFilter}
                    updateAuthorFilter={this.updateAuthorFilter}
                />
                {
                    !dataIsLoaded ? (<Spinner />) : (this.posts('default'))
                }
            </div>
        );
    }
}

export default PostsList;
