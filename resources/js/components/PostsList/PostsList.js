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
            dateSinceFilter: '',
            dateUntilFilter: '',
            dataIsLoaded: false
        };
        this.renderPosts = this.renderPosts.bind(this);
        this.updateCategoryFilter = this.updateCategoryFilter.bind(this);
        this.updateAuthorFilter = this.updateAuthorFilter.bind(this);
        this.updateTagFilter = this.updateTagFilter.bind(this);
        this.updateSearchFilter = this.updateSearchFilter.bind(this);
        this.updateDateSinceFilter = this.updateDateSinceFilter.bind(this);
        this.updateDateUntilFilter = this.updateDateUntilFilter.bind(this);
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

    updateDateSinceFilter(value) {
        this.setState({dateSinceFilter: value}, () => {
            this.filterPosts();
        });
    }

    updateDateUntilFilter(value) {
        this.setState({dateUntilFilter: value}, () => {
            this.filterPosts();
        });
    }

    filterPosts() {
        let filteredPosts = this.state.posts;

        if (this.state.categoryFilter) {
            if (this.state.categoryFilter.length > 0) {
                filteredPosts = filteredPosts.filter(post => {
                    for (let i = 0; i < this.state.categoryFilter.length; i++) {
                        if (post.category === this.state.categoryFilter[i]) return true;
                    }
                    return false;
                });
            }
        }

        if (this.state.authorFilter) {
            if (this.state.authorFilter.length > 0) {
                filteredPosts = filteredPosts.filter(post => {
                    let authorFullName = post.name + " " + post.surname;
                    for (let i = 0; i < this.state.authorFilter.length; i++) {
                        if (authorFullName === this.state.authorFilter[i]) return true;
                    }
                    return false;
                });
            }
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
            let searchFilter = this.state.searchFilter.toLowerCase();
            filteredPosts = filteredPosts.filter(post => {
                if(~post.title.toLowerCase().indexOf(searchFilter) || ~post.description.toLowerCase().indexOf(searchFilter)) return true;
                return false;
            });
        }

        if(this.state.dateSinceFilter) {
            let dateSinceFilter = this.state.dateSinceFilter;
            filteredPosts = filteredPosts.filter(post => {
                let created_at = new Date(post.created_at);
                if(created_at >= dateSinceFilter) return true;
                return false;
            });
        }

        if(this.state.dateUntilFilter) {
            let dateUntilFilter = this.state.dateUntilFilter;
            filteredPosts = filteredPosts.filter(post => {
                let created_at = new Date(post.created_at);
                if(created_at <= dateUntilFilter) return true;
                return false;
            });
        }

        this.setState({filteredPosts: filteredPosts});
    }

    renderPosts() {
        if (this.state.filteredPosts instanceof Array) {
            if(this.state.filteredPosts.length === 0) {
                return (<div>
                    <h3 className="text-center mt-5">Не найдено публикаций удовлетворяющих фильтру</h3>
                </div>);
            }
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
                {
                    !dataIsLoaded ? (<Spinner />) :
                        (<div>
                            <Filter
                                type={'default'}
                                updateCategoryFilter={this.updateCategoryFilter}
                                updateAuthorFilter={this.updateAuthorFilter}
                                updateTagFilter={this.updateTagFilter}
                                updateSearchFilter={this.updateSearchFilter}
                                updateDateSinceFilter={this.updateDateSinceFilter}
                                updateDateUntilFilter={this.updateDateUntilFilter}
                            />
                            {this.renderPosts()}
                        </div>)
                }
            </div>
        );
    }
}

export default PostsList;
