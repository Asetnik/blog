import React, {Component} from 'react';
import PostsList from "../PostsList/PostsList";
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import Filter from "../Filter/Filter";

class Category extends PostsList {

    constructor(props) {
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
    }

    componentWillMount() {
        axios
            .get('/api/categories/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    posts: response.data,
                    filteredPosts: response.data
                }, () => {
                    this.setState({
                        dataIsLoaded: true
                    });
                });
            });
    }

    render() {
        const dataIsLoaded = this.state.dataIsLoaded;
        return (
            <div className="category-page">
                {
                    !dataIsLoaded ? (<Spinner/>) : (
                        <div>
                            <Filter
                                type={'category'}
                                updateAuthorFilter={this.updateAuthorFilter}
                                updateTagFilter={this.updateTagFilter}
                                updateSearchFilter={this.updateSearchFilter}
                                updateDateSinceFilter={this.updateDateSinceFilter}
                                updateDateUntilFilter={this.updateDateUntilFilter}
                            />
                            <span
                                className="badge badge-primary category-page-title">{"Категория " + this.state.posts[0].category.category}</span>
                            {this.renderPosts(this.state.filteredPosts)}
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Category;
