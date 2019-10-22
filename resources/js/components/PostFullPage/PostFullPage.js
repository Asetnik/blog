import React, { Component } from 'react';
import PostFull from "../Post/PostFull/PostFull";
import TopCategories from "../TopCategories/TopCategories";
import SimilarPosts from "../SimilarPosts/SimilarPosts";
import Page404 from "../Page404/Page404";
import Spinner from "../Spinner/Spinner";

class PostFullPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataIsLoaded: false,
            postNotFound: false
        };
        this.dataIsLoaded = this.dataIsLoaded.bind(this);
        this.postNotFound = this.postNotFound.bind(this);
    }

    dataIsLoaded(param){
        console.log('call');
        this.setState({dataIsLoaded: param});
    }

    postNotFound(){
        this.setState({postNotFound: true});
    }

    render() {
        return (
            !this.state.postNotFound ? (
                <div className="post-full-page row">
                    <div className="col-9">
                        <PostFull {...this.props} postNotFound={this.postNotFound} dataIsLoaded={this.dataIsLoaded}/>
                    </div>
                    {
                        this.state.dataIsLoaded &&
                        <div className="col-3">
                            <TopCategories />
                            <SimilarPosts post_id={this.props.match.params.id} />
                        </div>
                    }
                </div>
            ) : (<Page404 />)
        );
    }
}

export default PostFullPage;
