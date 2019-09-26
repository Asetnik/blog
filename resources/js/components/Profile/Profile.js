import React, { Component } from 'react';
import {connect} from "react-redux";
import Filter from "../Filter/Filter";
import PostsList from "../PostsList/PostsList";
import axios from 'axios';
import Spinner from "../Spinner/Spinner";

class Profile extends PostsList {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            filteredPosts: [],
            categoryFilter: [],
            tagFilter: [],
            searchFilter: [],
            dateSinceFilter: '',
            dateUntilFilter: '',
            dataIsLoaded: false
        };
    }

    componentWillMount() {
        axios.get('/api/getuserposts')
            .then(response => {
                this.setState({
                    posts: response.data,
                    filteredPosts: response.data
                }, () => {
                    this.setState({dataIsLoaded: true});
                });
            });
    }

    render() {
        return (
            !this.state.dataIsLoaded ? <Spinner /> :
                <div className="profile-page">
                    <h3 className="page-header mb-4">Мой профиль</h3>
                    <div className="profile-info-wrapper">
                        <img src={this.props.store.user.photo} alt="Аватар"/>
                        <div className="profile-info">
                            <div className="profile-info-label"><p>ФИО:</p></div>
                            <div className="profile-info-labeled"><p>{this.props.store.user.surname + " " + this.props.store.user.name + " " + (this.props.store.user.patronymic || "")}</p></div>
                            <div className="profile-info-label"><p>E-mail:</p></div>
                            <div className="profile-info-labeled"><p>{this.props.store.user.email}</p></div>
                            <div className="profile-info-label"><p>Дата регистрации:</p></div>
                            <div className="profile-info-labeled"><p>{this.props.store.user.created_at}</p></div>
                            {this.props.store.user.description &&
                            <React.Fragment>
                                <div className="profile-info-label"><p>Описание:</p></div>
                                <div className="profile-info-labeled"><p>{this.props.store.user.description}</p></div>
                            </React.Fragment>
                            }
                            <button className="btn edit-profile-button"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                        </div>
                    </div>

                    <h3 className="page-header mt-5">Мои публикации</h3>
                    <Filter
                        className={"mt-5 mb-5"}
                        type={'user'}
                        updateCategoryFilter={this.updateCategoryFilter}
                        updateTagFilter={this.updateTagFilter}
                        updateSearchFilter={this.updateSearchFilter}
                        updateDateSinceFilter={this.updateDateSinceFilter}
                        updateDateUntilFilter={this.updateDateUntilFilter}
                    />

                    {this.renderPosts(this.state.filteredPosts)}
                </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(Profile);
