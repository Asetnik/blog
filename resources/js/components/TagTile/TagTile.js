import React, { Component } from 'react';
import {Link} from "react-router-dom";

class TagTile extends Component{

    constructor(props) {
        super(props);
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
            <Link to={'/search?tag='+this.props.tag.tag_id}
                  className="tag-wrapper">
                <span className="badge badge-secondary tag" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}><i className="fa fa-tag" aria-hidden="true"></i> {this.props.tag.tag}</span>
            </Link>
        );
    }
}

export default TagTile;
