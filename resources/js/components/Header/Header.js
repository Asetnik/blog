import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={};
    }

    render() {
        return (
            <div className="nav">
                <div className="container nav-wrapper">
                    <NavLink to='/' className="nav-logo float-left text-link">Blog</NavLink>
                    <div className="nav-links float-right">
                        <ul>
                            <NavLink to='/' exact={true} activeClassName='active' className="nav-link text-link">Главная</NavLink>
                            <NavLink to='/create/posts' exact={true} activeClassName='active' className="nav-link text-link">Создать публикацию</NavLink>
                            <NavLink to='/myprofile' activeClassName='active' className="nav-link text-link">Мой профиль</NavLink>
                            <NavLink to='/a/login' activeClassName='active' className="nav-link text-link">Войти</NavLink>
                            <NavLink to='/a/register' activeClassName='active' className="nav-link text-link">Зарегистрироваться</NavLink>
                            <NavLink to='/a/logout' className="nav-link text-link active">Выйти</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
