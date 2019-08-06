import React, { Component } from 'react';
import PostsList from "../PostsList/PostsList";
import axios from 'axios';

class Category extends PostsList {

    constructor(props){
        super(props);
        this.state = {
            categoryName: '',
            posts: []
        }
        this.posts = this.posts.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/categoryname/' + this.props.match.params.id)
            .then(response => {
                this.setState({categoryName: response.data})
            });
        axios
            .get('/api/category/' + this.props.match.params.id)
            .then(response => {
                this.setState({posts: response.data})
            });
    }

    render() {
        return (
            <div>
                <h3>Категория {this.state.categoryName}</h3>
                {this.posts()}
            </div>
        );
    }
}

export default Category;
