import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Header from "../Header/Header";
import {connect} from "react-redux";

class AuthLayout extends Component{

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="page-content container">
                    {this.props.store.isAuth ? (
                        <React.Fragment>
                            <Route path={'/auth/logout'} exact component={ Logout } />
                            <Redirect to={'/'}/>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Route path={'/auth/register'} exact render={ props => <Register {...props} /> } />
                            <Route path={'/auth/login'} exact render={props => <Login {...props} /> } />
                            <Redirect to={'/auth/login'}/>
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(AuthLayout);
