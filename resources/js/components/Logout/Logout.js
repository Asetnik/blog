import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';

class Logout extends Component{
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        axios.post('/logout', {})
            .then(response => {
                if(response.status === 200) {
                    this.props.onLogout();
                    this.props.history.push("/auth/login");
                }
            });
    }

    render() {
        return null;
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onLogout: () => {
            dispatch({ type: 'LOGOUT' });
        }
    })
)(Logout);
