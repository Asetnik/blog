import React, { Component } from 'react';
import PostFull from "../Post/PostFull/PostFull";
import TopAuthors from "../TopAuthors/TopAuthors";

class PostFullPage extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <div className="post-full-page row">
            <div className="col-9">
                <PostFull {...this.props} />
            </div>
            <div className="col-3">
                <TopAuthors />
            </div>
        </div>
    }
}

export default PostFullPage;
