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
            searchFilter: [],
            dateSinceFilter: '',
            dateUntilFilter: '',
            dataIsLoaded: false
        };
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
                {
                    !dataIsLoaded ? (<Spinner />) : (
                        <div>
                            <Filter
                                type={'category'}
                                updateAuthorFilter={this.updateAuthorFilter}
                                updateTagFilter={this.updateTagFilter}
                                updateSearchFilter={this.updateSearchFilter}
                                updateDateSinceFilter={this.updateDateSinceFilter}
                                updateDateUntilFilter={this.updateDateUntilFilter}
                            />
                            <span className="badge badge-primary category-page-title">{"Категория " + this.state.categoryName}</span>
                            {this.renderPosts()}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Category;
