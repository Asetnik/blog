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
import Logout from "../Logout/Logout";
import Header from "../Header/Header";
import CreatePost from "../CreatePost/CreatePost";
import AdminEditPost from "../AdminEditPost/AdminEditPost";

class DefaultLayout extends Component{

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="page-content container">
                    <Route path={'/'} exact component={ PostsList } />
                    <Route path={'/categories/:id'} exact component={ Category } />
                    <Route path={'/create/posts'} exact component={ (props) => <AdminEditPost {...props} type="create"/> } />
                    <Route path={'/posts/:id'} exact component={ PostFull } />
                    <Route path={'/users/:id'} exact component={ UserPage } />
                    <Route path={'/myprofile'} exact component={ Profile } />
                    <Route path={'/a/register'} exact component={ Register } />
                    <Route path={'/a/login'} exact component={ Login } />
                    <Route path={'/a/logout'} exact component={ Logout } />
                </div>
            </React.Fragment>
        );
    }
}

export default DefaultLayout;
