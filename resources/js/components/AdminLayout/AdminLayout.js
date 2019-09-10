import React, { Component } from 'react';
import AdminMenu from "../AdminMenu/AdminMenu";
import { Route, Redirect } from 'react-router-dom';
import AdminPostList from "../AdminPostList/AdminPostList";
import AdminEditPost from "../AdminEditPost/AdminEditPost";

class AdminLayout extends Component{

    render() {
        return (
            <div className="admin-layout">
                <AdminMenu />
                <div className="adminpage-content">
                     <Route path={'/admin/posts'} exact component={ AdminPostList } />
                     <Route path={'/admin/post/edit/:id'} exact component={ AdminEditPost } />
{/*                  <Route path={'/post/:id'} exact component={ PostFull } />
                    <Route path={'/user/:id'} exact component={ UserPage } />
                    <Route path={'/myprofile'} exact component={ Profile } />
                    <Route path={'/a/register'} exact component={ Register } />
                    <Route path={'/a/login'} exact component={ Login } />*/}
                    <Redirect to="/admin/posts" />
                </div>
            </div>
        );
    }
}

export default AdminLayout;
