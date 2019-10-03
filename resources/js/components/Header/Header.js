import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

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
                            {this.props.store.isAuth ? (
                                    <React.Fragment>
                                        <NavLink to='/' exact={true} activeClassName='active' className="nav-link text-link">Главная</NavLink>
                                        <NavLink to='/create/posts' activeClassName='active' className="nav-link text-link">Создать публикацию</NavLink>
                                        <NavLink to='/auth/logout' className="nav-link text-link active">Выйти</NavLink>
                                        <NavLink to='/myprofile' className="nav-link text-link user-info-wrapper">
                                            <p>{this.props.store.user.name}</p>
                                            <img src={this.props.store.user.photo} alt="Профиль"/>
                                        </NavLink>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <NavLink to='/auth/login' activeClassName='active' className="nav-link text-link">Войти</NavLink>
                                        <NavLink to='/auth/register' activeClassName='active' className="nav-link text-link">Зарегистрироваться</NavLink>
                                    </React.Fragment>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(Header);
