import React, { Component } from 'react';
import {Link} from "react-router-dom";

class CategoryTile extends Component {

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    onMouseOver(e){
        e.target.classList.replace('badge-primary', 'badge-success');
    }

    onMouseOut(e){
        e.target.classList.replace( 'badge-success','badge-primary');
    }

    render() {
        return (
            <Link to={'/categories/'+this.props.category_id} className="d-block">
                <span className="badge badge-primary" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>{this.props.category}</span>
            </Link>
        );
    }
}

export default CategoryTile;
