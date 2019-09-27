import React, { Component } from 'react';
import AdminMenu from "../AdminMenu/AdminMenu";
import { Route, Redirect } from 'react-router-dom';
import AdminPostsList from "../AdminPostsList/AdminPostsList";
import EditPost from "../EditPost/EditPost";
import AdminCategoriesList from "../AdminCategoriesList/AdminCategoriesList";
import AdminEditCategory from "../AdminEditCategory/AdminEditCategory";
import AdminUsersList from "../AdminUsersList/AdminUsersList";
import EditUser from "../EditUser/EditUser";

class AdminLayout extends Component{

    render() {
        return (
            <div className="admin-layout">
                <AdminMenu />
                <div className="adminpage-content">
                    <Route path={'/admin/posts'} exact component={ AdminPostsList } />
                    <Route path={'/admin/posts/:id/edit'} exact component={ (props) => <EditPost {...props} type="adminEdit"/> } />
                    <Route path={'/admin/posts/create'} exact component={ (props) => <EditPost {...props} type="adminCreate"/> } />
                    <Route path={'/admin/categories'} exact component={ AdminCategoriesList } />
                    <Route path={'/admin/categories/:id/edit'} exact component={ (props) => <AdminEditCategory {...props} type="edit"/> } />
                    <Route path={'/admin/categories/create'} exact component={ (props) => <AdminEditCategory {...props} type="create"/> } />
                    <Route path={'/admin/users'} exact component={ AdminUsersList } />
                    <Route path={'/admin/users/:id/edit'} exact component={ (props) => <EditUser {...props} type="adminEdit"/> } />
                    <Route path={'/admin/users/create'} exact component={ (props) => <EditUser {...props} type="adminCreate"/> } />
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
