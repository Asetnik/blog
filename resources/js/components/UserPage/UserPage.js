import React, { Component } from 'react';
import axios from "axios";
import Filter from "../Filter/Filter";
import Spinner from "../Spinner/Spinner";
import PostsList from "../PostsList/PostsList";

class UserPage extends PostsList {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            filteredPosts: {},
            categoryFilter: [],
            tagFilter: [],
            searchFilter: [],
            dateSinceFilter: '',
            dateUntilFilter: '',
            dataIsLoaded: false
        };
    }

    componentWillMount() {
        axios
            .get('/api/user/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    user: response.data
                }, () => {
                    this.setState({dataIsLoaded: true})
                });
            });
    }

    render() {
        const dataIsLoaded = this.state.dataIsLoaded;
        return (
            <div className="user-page">{
                !dataIsLoaded ? (<Spinner />) : (
                    <div>
                        <div className="blog-card user-info">
                            <div className="photo-wrapper">
                                <img src={this.state.user.photo} alt=""/>
                            </div>
                            <div className="info-wrapper">
                                <h3>{this.state.user.name + " " + this.state.user.surname}</h3>
                                <p><span>Описание:</span> {this.state.user.description}</p>
                                <p><span>Количество статей:</span> {this.state.user.posts.length}</p>
                            </div>
                        </div>

                        <Filter
                            type={'user'}
                            updateCategoryFilter={this.updateCategoryFilter}
                            updateTagFilter={this.updateTagFilter}
                            updateSearchFilter={this.updateSearchFilter}
                            updateDateSinceFilter={this.updateDateSinceFilter}
                            updateDateUntilFilter={this.updateDateUntilFilter}
                        />

                        {this.renderPosts(this.state.user.posts)}
                    </div>
                )
            }
            </div>
        );
    }
}

export default UserPage;
