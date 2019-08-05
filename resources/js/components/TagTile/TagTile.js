import React, { Component } from 'react';
import {Link} from "react-router-dom";

class TagTile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            tagId: props.tagId,
            tagName: props.tagName
        };
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    onMouseOver(e){
        e.target.classList.replace('badge-secondary', 'badge-success');
    }

    onMouseOut(e){
        e.target.classList.replace( 'badge-success','badge-secondary');
    }

    render() {
        return (
            <Link to={'/tag/'+this.state.tagId} className="tag-wrapper">
                <span className="badge badge-secondary tag" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}><i className="fa fa-tag" aria-hidden="true"></i>{this.state.tagName}</span>
            </Link>
        );
    }
}

export default TagTile;