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
            tagFilter: [],
            searchFilter: [],
            dataIsLoaded: false
        };
        this.renderPostTags = this.renderPostTags.bind(this);
        this.updateCategoryFilter = this.updateCategoryFilter.bind(this);
        this.updateAuthorFilter = this.updateAuthorFilter.bind(this);
        this.updateTagFilter = this.updateTagFilter.bind(this);
        this.updateSearchFilter = this.updateSearchFilter.bind(this);
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

    updateTagFilter(value) {
        this.setState({tagFilter: value}, () => {
            this.filterPosts();
        });
    }

    updateSearchFilter(value) {
        this.setState({searchFilter: value}, () => {
            this.filterPosts();
        });
    }

    filterPosts() {
        let filteredPosts = this.state.posts;

        if (this.state.categoryFilter instanceof Array) {
            if (this.state.categoryFilter.length > 0) {
                filteredPosts = filteredPosts.filter(post => {
                    for (let i = 0; i < this.state.categoryFilter.length; i++) {
                        if (post.category === this.state.categoryFilter[i]) return true;
                    }
                    return false;
                });
            }
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

        if(this.state.tagFilter.length > 0) {
            filteredPosts = filteredPosts.filter(post => {
                for(let i = 0; i < this.state.tagFilter.length; i++) {
                    for(let j = 0; j < post.tags.length; j++) {
                        if(post.tags[j].tag === this.state.tagFilter[i]) return true;
                    }
                }
                return false;
            });
        }

        if(this.state.searchFilter.length > 0) {
            filteredPosts = filteredPosts.filter(post => {
                let searchFilter = this.state.searchFilter.toLowerCase();
                if(~post.title.toLowerCase().indexOf(searchFilter) || ~post.description.toLowerCase().indexOf(searchFilter)) return true;
                return false;
            });
        }

        this.setState({filteredPosts: filteredPosts});
    }

    renderPostTags() {
        if (this.state.filteredPosts instanceof Array) {
            return (<div>
                {
                    this.state.filteredPosts.map(function (post, index) {
                        return <PostFolded
                            key={index}
                            post={post}
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
                    updateTagFilter={this.updateTagFilter}
                    updateSearchFilter={this.updateSearchFilter}
                />
                {
                    !dataIsLoaded ? (<Spinner />) : (this.renderPostTags())
                }
            </div>
        );
    }
}

export default PostsList;
