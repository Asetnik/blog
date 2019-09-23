import React, { Component } from 'react';
import AdminMenu from "../AdminMenu/AdminMenu";
import { Route, Redirect } from 'react-router-dom';
import AdminPostList from "../AdminPostList/AdminPostList";
import EditPost from "../EditPost/EditPost";
import AdminCategoryList from "../AdminCategoryList/AdminCategoryList";
import AdminEditCategory from "../AdminEditCategory/AdminEditCategory";

class AdminLayout extends Component{

    render() {
        return (
            <div className="admin-layout">
                <AdminMenu />
                <div className="adminpage-content">
                    <Route path={'/admin/posts'} exact component={ AdminPostList } />
                    <Route path={'/admin/posts/:id/edit'} exact component={ (props) => <EditPost {...props} type="adminEdit"/> } />
                    <Route path={'/admin/posts/create'} exact component={ (props) => <EditPost {...props} type="adminCreate"/> } />
                    <Route path={'/admin/categories'} exact component={ AdminCategoryList } />
                    <Route path={'/admin/categories/:id/edit'} exact component={ (props) => <AdminEditCategory {...props} type="edit"/> } />
                    <Route path={'/admin/categories/create'} exact component={ (props) => <AdminEditCategory {...props} type="create"/> } />
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
