import React, { Component } from 'react';
import PostsList from "../PostsList/PostsList";
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import Filter from "../Filter/Filter";

class Category extends PostsList {

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            filteredPosts: [],
            authorFilter: [],
            tagFilter: [],
            dataIsLoaded: false
        };
        this.renderPostTags = this.renderPostTags.bind(this);
        this.makeRequests = this.makeRequests.bind(this);
    }

    makeRequests() {
        let requestsCounter = 0;

        return new Promise(resolve => {

            axios
                .get('/api/categoryname/' + this.props.match.params.id)
                .then(response => {
                    this.setState({categoryName: response.data});
                    ++requestsCounter;
                    if(requestsCounter === 2) resolve();
                });

            axios
                .get('/api/category/' + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        posts: response.data,
                        filteredPosts: response.data
                    });
                    ++requestsCounter;
                    if(requestsCounter === 2) resolve();
                });
        });
    }

    componentWillMount() {
        this.makeRequests()
            .then(() => {
                this.setState({dataIsLoaded: true});
            });
    }

    render() {
        const dataIsLoaded = this.state.dataIsLoaded;
        return (
            <div className="category-page">
                <Filter
                    type={'category'}
                    updateAuthorFilter={this.updateAuthorFilter}
                    updateTagFilter={this.updateTagFilter}
                    updateSearchFilter={this.updateSearchFilter}
                />
                {
                    !dataIsLoaded ? (<Spinner />) : (
                        <div>
                            <h3 className="category-page-header">Категория {this.state.categoryName}</h3>
                            {this.renderPostTags()}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Category;
