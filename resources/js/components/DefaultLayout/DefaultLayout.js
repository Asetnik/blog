import React, { Component } from 'react';
import PostFolded from "../Post/PostFolded/PostFolded";
import PostFull from "../Post/PostFull/PostFull";
import Category from "../Category/Category";
import UserPage from "../UserPage/UserPage";
import Profile from "../Profile/Profile";
import { Switch, Route, Redirect } from 'react-router-dom';
import PostsList from "../PostsList/PostsList";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";

class DefaultLayout extends Component{

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="page-content container">
                    <Route path={'/'} exact component={ PostsList } />
                    <Route path={'/category/:id'} exact component={ Category } />
                    <Route path={'/post/:id'} exact component={ PostFull } />
                    <Route path={'/user/:id'} exact component={ UserPage } />
                    <Route path={'/myprofile'} exact component={ Profile } />
                    <Route path={'/a/register'} exact component={ Register } />
                    <Route path={'/a/login'} exact component={ Login } />
                </div>
            </React.Fragment>
        );
    }
}

export default DefaultLayout;
