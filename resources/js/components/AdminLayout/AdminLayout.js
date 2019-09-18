import React, { Component } from 'react';
import AdminMenu from "../AdminMenu/AdminMenu";
import { Route, Redirect } from 'react-router-dom';
import AdminPostList from "../AdminPostList/AdminPostList";
import AdminEditPost from "../AdminEditPost/AdminEditPost";
import AdminCreatePost from "../AdminCreatePost/AdminCreatePost";

class AdminLayout extends Component{

    render() {
        return (
            <div className="admin-layout">
                <AdminMenu />
                <div className="adminpage-content">
                    <Route path={'/admin/posts'} exact component={ AdminPostList } />
                    <Route path={'/admin/posts/edit/:id'} exact component={ (props) => <AdminEditPost {...props} type="edit"/> } />
                    <Route path={'/admin/posts/create'} exact component={ (props) => <AdminEditPost {...props} type="create"/> } />
{/*                  <Route path={'/post/:id'} exact component={ PostFull } />
                    <Route path={'/user/:id'} exact component={ UserPage } />
                    <Route path={'/myprofile'} exact component={ Profile } />
                    <Route path={'/a/register'} exact component={ Register } />
                    <Route path={'/a/login'} exact component={ Login } />*/}
                </div>
            </div>
        );
    }
}

export default AdminLayout;
