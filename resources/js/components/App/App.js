import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import AdminLayout from "../AdminLayout/AdminLayout";
import DefaultLayout from "../DefaultLayout/DefaultLayout";
import axios from 'axios';
import { connect } from 'react-redux';
import AuthLayout from "../AuthLayout/AuthLayout";
import Spinner from "../Spinner/Spinner";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataIsLoaded: false
        }
    }

    componentWillMount() {
        axios.get('/api/isauth')
            .then(response => {
                this.props.onISAUTH({...response.data});
                this.setState({dataIsLoaded: true});
            });
    }

    render() {
        return ( !this.state.dataIsLoaded ? <Spinner /> :
            <BrowserRouter>
                <Switch>
                    <Route path={'/auth'} render={ props => <AuthLayout {...props} /> } />
                    <Route path={'/admin'} render={ props => this.props.store.isAuth && this.props.store.user.role_id === 3 ? <AdminLayout {...props} /> : <Redirect to={'/auth/login'}/> } />
                    <Route path={'/'} render={ props => this.props.store.isAuth ? <DefaultLayout {...props} /> : <Redirect to={'/auth/login'}/> } />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onISAUTH: (data) => {
            dispatch({ type: 'ISAUTH', data: data })
        }
    })
)(App);
