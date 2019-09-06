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

class PageContent extends Component{

    render() {
        return (
            <div className="page-content">
                <Switch>
                    <Route path={'/'} exact component={ PostsList } />
                    <Route path={'/category/:id'} exact component={ Category } />
                    <Route path={'/post/:id'} exact component={ PostFull } />
                    <Route path={'/user/:id'} exact component={ UserPage } />
                    <Route path={'/myprofile'} exact component={ Profile } />
                    <Route path={'/a/register'} exact component={ Register } />
                    <Route path={'/a/login'} exact component={ Login } />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default PageContent;
