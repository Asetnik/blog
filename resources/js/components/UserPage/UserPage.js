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
            posts: {},
            filteredPosts: {},
            categoryFilter: [],
            tagFilter: [],
            searchFilter: [],
            dateSinceFilter: '',
            dateUntilFilter: '',
            dataIsLoaded: false
        };
    }

    makeRequests() {
        let requestsCounter = 0;

        return new Promise(resolve => {

            axios
                .get('/api/user/' + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        user: response.data[0]
                    });
                    ++requestsCounter;
                    if(requestsCounter === 2) resolve();
                });

            axios
                .get('/api/getuserposts/' + this.props.match.params.id)
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
            <div className="user-page">{
                !dataIsLoaded ? (<Spinner />) : (
                    <div>
                        <div className="user-info">
                            <div className="photo-wrapper">
                                <img src={this.state.user.photo} alt=""/>
                            </div>
                            <div className="info-wrapper">
                                <h3>{this.state.user.name + " " + this.state.user.surname}</h3>
                                <p><span>Описание:</span> {this.state.user.description}</p>
                                <p><span>Количество статей:</span> {this.state.user.numUserPosts}</p>
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

                        {this.renderPosts()}
                    </div>
                )
            }
            </div>
        );
    }
}

export default UserPage;
