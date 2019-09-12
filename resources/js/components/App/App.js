import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import AdminLayout from "../AdminLayout/AdminLayout";
import DefaultLayout from "../DefaultLayout/DefaultLayout";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={'/admin'}  component={ AdminLayout } />
                    <Route path={'/'} component={ DefaultLayout } />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
