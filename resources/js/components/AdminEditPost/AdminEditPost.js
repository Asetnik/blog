import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";

class AdminEditPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            post: {},
            dataIsLoaded: false
        };
    }

    componentWillMount() {
        axios.get('/api/post/' + this.props.match.params.id)
            .then(response => {
                this.setState({post: response.data}, () => {
                    this.setState({dataIsLoaded: true});
                });
            });
    }

    render() {
        return(
            !this.state.dataIsLoaded ? (Spinner) : (
                <div>
                    <input type="text" value={this.state.post.title}/>
                </div>
            )
        );
    }
}

export default AdminEditPost;
