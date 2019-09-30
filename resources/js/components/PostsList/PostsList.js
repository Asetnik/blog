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
            filter: {
                category: '',
                author: '',
                tag: '',
                search: '',
                dateSince: '',
                dateUntil: ''
            },
            dataIsLoaded: false
        };
        this.renderPosts = this.renderPosts.bind(this);
        this.updateCategoryFilter = this.updateCategoryFilter.bind(this);
        this.updateAuthorFilter = this.updateAuthorFilter.bind(this);
        this.updateTagFilter = this.updateTagFilter.bind(this);
        this.updateSearchFilter = this.updateSearchFilter.bind(this);
        this.updateDateSinceFilter = this.updateDateSinceFilter.bind(this);
        this.updateDateUntilFilter = this.updateDateUntilFilter.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/posts')
            .then(response => {
                this.setState({
                    posts: response.data,
                    filteredPosts: response.data,
                    dataIsLoaded: true
                });
            });
    }

    updateCategoryFilter(value) {
        this.setState({
            filter: {
                ...this.state.filter,
                category: value
            }
        }, () => {
            /*this.filterPosts();*/
            axios.get('/api/posts', {
                params: this.state.filter
            })
                .then(response => {
                    this.setState({
                        posts: response.data
                    });
                });
        });
    }

    updateAuthorFilter(value) {
        this.setState({
            filter: {
                ...this.state.filter,
                author: value
            }
        }, () => {
            axios.get('/api/posts/', {
                params: this.state.filter
            })
                .then(response => {
                    this.setState({
                        posts: response.data
                    });
                });
        });
    }

    updateTagFilter(value) {
        this.setState({
            filter: {
                ...this.state.filter,
                tag: value
            }
        }, () => {
            /*this.filterPosts();*/
            axios.get('/api/posts', {
                params: this.state.filter
            })
                .then(response => {
                    this.setState({
                        posts: response.data
                    });
                });
        });
    }

    updateSearchFilter(value) {
        this.setState({
            filter: {
                ...this.state.filter,
                search: value
            }
        }, () => {

            axios.get('/api/posts', {
                params: this.state.filter
            })
                .then(response => {
                    this.setState({
                        posts: response.data
                    });
                });
        });
    }

    updateDateSinceFilter(value) {
        this.setState({
            filter: {
                ...this.state.filter,
                dateSince: value.addHours(3)
            }
        }, () => {
            axios.get('/api/posts', {
                params: this.state.filter
            })
                .then(response => {
                    this.setState({
                        posts: response.data
                    });
                });
        });
    }

    updateDateUntilFilter(value) {
        this.setState({
            filter: {
                ...this.state.filter,
                dateUntil: value
            }
        }, () => {
            axios.get('/api/posts', {
                params: this.state.filter
            })
                .then(response => {
                    this.setState({
                        posts: response.data
                    });
                });
        });
    }

    renderPosts(posts) {
        if (posts instanceof Array) {
            if(posts.length === 0) {
                return (<div>
                    <h3 className="text-center mt-5">Публикации не найдены</h3>
                </div>);
            }
            return (<div>
                {
                    posts.map(function (post, index) {
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
                {
                    !dataIsLoaded ? (<Spinner />) :
                        (<div>
                            <Filter
                                className={"mb-5"}
                                type={'default'}
                                updateCategoryFilter={this.updateCategoryFilter}
                                updateAuthorFilter={this.updateAuthorFilter}
                                updateTagFilter={this.updateTagFilter}
                                updateSearchFilter={this.updateSearchFilter}
                                updateDateSinceFilter={this.updateDateSinceFilter}
                                updateDateUntilFilter={this.updateDateUntilFilter}
                            />
                            {this.renderPosts(this.state.posts)}
                        </div>)
                }
            </div>
        );
    }
}

export default PostsList;
