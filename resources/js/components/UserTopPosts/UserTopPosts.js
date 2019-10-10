import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import {Link} from "react-router-dom";

class UserTopPosts extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            dataIsLoaded: false
        }
    }

    componentDidMount() {
        axios.get('/api/userpopularposts/' + this.props.user_id)
            .then(response => {
               this.setState({
                   posts: response.data
               }, () => {
                   this.setState({
                       dataIsLoaded: true
                   });
               });
            });
    }

    render() {
        return(
            <div className="blog-card user-top-posts mt-5">
                <h3 className="mb-3">Популярные публикации автора</h3>
                {!this.state.dataIsLoaded ? <Spinner /> : (
                    <React.Fragment>
                        {
                            this.state.posts.map((post, index) => {
                                return <div key={index} className="d-flex align-items-center mb-3">
                                    <Link key={index} to={"/posts/" + post.id} className="text-link d-block post-link float-left">{post.title}</Link>
                                    <span className="badge badge-secondary float-left ml-3"><i className="fa fa-eye" aria-hidden="true"></i>{post.views}</span>
                                    <div className="clearfix"></div>
                                </div>
                            })
                        }
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default UserTopPosts;
