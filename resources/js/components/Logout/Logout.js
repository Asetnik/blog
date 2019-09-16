import React, { Component } from 'react';
import axios from "axios";

class Logout extends Component{
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        axios.post('/logout', {})
            .then(response => {
                if(response.status === 200) {
                    this.props.history.push("/a/login");
                }
            });
    }

    render() {
        return null;
    }
}

export default Logout;
