import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Spinner from "../Spinner/Spinner";

class SimilarPosts extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            dataIsLoaded: false
        }
    }

    componentDidMount() {
        axios.get('/api/similarposts/' + this.props.post_id)
            .then(respone => {
               this.setState({
                   posts: respone.data
               }, () => {
                   this.setState({
                       dataIsLoaded: true
                   });
               });
            });
    }

    render() {
        return(<div className="blog-card similar-posts">
            <h3 className="mb-3 text-green">Похожие публикации</h3>
            {!this.state.dataIsLoaded ? <Spinner /> : (
                <React.Fragment>
                    {
                        this.state.posts.map((post, index) => {
                            return <Link key={index} to={"/posts/" + post.id} className="text-link d-block similar-post mb-3">{post.title}</Link>
                        })
                    }
                </React.Fragment>
            )}
        </div>
        );
    }
}

export default SimilarPosts;
