import React, { Component } from 'react';
import axios from "axios";

class Logout extends Component{
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        axios.post('/logout', {})
            .then(response => {
                console.log(response);
                this.props.history.push("/a/login");
            });
    }

    render() {
        return(
            <div></div>
        );
    }
}

export default Logout;
