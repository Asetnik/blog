import React, { Component } from 'react';
import {connect} from "react-redux";
import Filter from "../Filter/Filter";
import PostsList from "../PostsList/PostsList";
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import { NavLink } from "react-router-dom";

class Profile extends PostsList {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            filter: {
                category: '',
                author: '',
                tag: '',
                search: '',
                dateSince: '',
                dateUntil: ''
            },
            categoryFilter: [],
            tagFilter: [],
            searchFilter: [],
            dateSinceFilter: '',
            dateUntilFilter: '',
            dataIsLoaded: false,
            postsIsLoaded: false
        };
        this.updateFilter = this.updateFilter.bind(this);
    }

    componentWillMount() {
        axios.all([
            axios.get('/api/isauth'),
            axios.get('/api/getuserposts')
        ])
            .then(axios.spread((firstResponse, secondResponse) => {
                this.props.onLogin({...firstResponse.data});
                this.setState({
                    posts: secondResponse.data,
                }, () => {
                    this.setState({
                        dataIsLoaded: true,
                        postsIsLoaded: true
                    });
                });
            }));
    }

    updateFilter(filter){
        this.setState({
            postsIsLoaded: false
        });
        this.setState({
            filter: {
                ...this.state.filter,
                ...filter
            }
        }, () => {
            axios.get('/api/getuserposts', {
                params: this.state.filter
            })
                .then(response => {
                    this.setState({
                        posts: response.data
                    }, () => {
                        this.setState({
                            postsIsLoaded: true
                        });
                    });
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
                            <NavLink to='/myprofile/edit'><button className="btn edit-profile-button"><i className="fa fa-pencil" aria-hidden="true"></i></button></NavLink>
                        </div>
                    </div>

                    <h3 className="page-header mt-5">Мои публикации</h3>
                    <Filter
                        className={"mt-5 mb-5"}
                        type={'user'}
                        updateFilter={this.updateFilter}
                    />

                    {
                        !this.state.postsIsLoaded ? (<Spinner />) :
                            (<React.Fragment>
                                {this.renderPosts(this.state.posts)}
                            </React.Fragment>)
                    }
                </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onLogin: (data) => {
            dispatch({ type: 'LOGIN', data: data })
        }
    })
)(Profile);
