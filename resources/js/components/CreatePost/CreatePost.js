import React, { Component } from 'react';
import axios from 'axios';

class CreatePost extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {}
        };
    }

    componentWillMount() {
        axios.get('/api/user')
            .then(response => {
                this.setState({
                    user: response.data
                });
            });

    }


    render() {

        return(
            <div>
            </div>
        );
    }
}

export default CreatePost;
