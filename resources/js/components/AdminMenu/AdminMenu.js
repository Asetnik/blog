import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class AdminMenu extends Component{

    render() {
        return(
            <div className="admin-menu">
                <h3 className="mb-5">Администрирование</h3>
                <ul>
                    <li><NavLink to='/admin/posts' className="admin-menu-link" activeClassName='active'>
                        <div><i className="fa fa-list-alt" aria-hidden="true"></i></div>
                        <div>Статьи</div>
                    </NavLink></li>
                    <li><NavLink to='/admin/categories' className="admin-menu-link" activeClassName='active'>
                        <div><i className="fa fa-cubes" aria-hidden="true"></i></div>
                        <div><span>Категории</span></div>
                    </NavLink></li>
                    <li><NavLink to='/admin/users' className="admin-menu-link" activeClassName='active'>
                        <div><i className="fa fa-users" aria-hidden="true"></i></div>
                        <div><span>Пользователи</span></div>
                    </NavLink></li>

                </ul>
            </div>
        );
    }
}

export default AdminMenu;
