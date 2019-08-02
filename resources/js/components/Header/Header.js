import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <div className="nav">
                <div className="container nav-wrapper">
                    <NavLink to='/' className="nav-logo float-left text-link">Blog</NavLink>
                    <div className="nav-links float-right">
                        <ul>
                            <NavLink to='/' exact={true} activeClassName='active' className="nav-link text-link">Главная</NavLink>
                            <NavLink to='/myprofile' activeClassName='active' className="nav-link text-link">Мой профиль</NavLink>
                            <NavLink to='/logout' activeClassName='active' className="nav-link text-link">Выйти</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
