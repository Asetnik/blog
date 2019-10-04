import React, { Component } from 'react';
import PostFolded from "../Post/PostFolded/PostFolded";
import PostFullPage from "../PostFullPage/PostFullPage";
import Category from "../Category/Category";
import UserPage from "../UserPage/UserPage";
import Profile from "../Profile/Profile";
import { Switch, Route, Redirect } from 'react-router-dom';
import PostsList from "../PostsList/PostsList";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Header from "../Header/Header";
import EditPost from "../EditPost/EditPost";
import EditUser from "../EditUser/EditUser"

class DefaultLayout extends Component{

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="page-content container">
                    <Route path={'/'} exact component={ PostsList } />
                    <Route path={'/categories/:id'} exact component={ Category } />
                    <Route path={'/create/posts'} exact component={ (props) => <EditPost {...props} type="create"/> } />
                    <Route path={'/posts/:id'} exact component={ PostFullPage } />
                    <Route path={'/users/:id'} exact component={ UserPage } />
                    <Route path={'/myprofile'} exact component={ Profile } />
                    <Route path={'/myprofile/edit'} exact component={ (props) => <EditUser {...props} type="edit"/> } />
                    <Redirect to={'/'} />
                </div>
            </React.Fragment>
        );
    }
}

export default DefaultLayout;
