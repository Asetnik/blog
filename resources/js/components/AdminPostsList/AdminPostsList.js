import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import {NavLink} from "react-router-dom";

class AdminPostsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: {},
            dataIsLoaded: false
        };
        this.renderPostList = this.renderPostList.bind(this);
    }

    componentWillMount() {
        axios.get('/api/posts')
            .then(response => {
                this.setState({posts: response.data}, () => {
                    this.setState({dataIsLoaded: true});
                });
            });
    }

    renderPostList(posts){
        let removePost = event => {
            event.preventDefault();
            let id = Number(event.target.parentNode.getAttribute("data-id"));
            axios.delete('/api/posts/' + id)
                .then(response => {
                    if(response.status === 200) {
                        this.setState({
                            posts: this.state.posts.filter(post => {return post.id !== id})
                        });
                    }
                });
        };
        if (posts instanceof Array) {
            if(posts.length === 0) {
                return (<div>
                    <h3 className="text-center mt-5">Публикации не найдены</h3>
                </div>);
            }
            return (<table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>id статьи</th>
                        <th>автор</th>
                        <th>заголовок</th>
                        <th>дата публикации</th>
                        <th>дата изменения</th>
                        <th>кол-во просмотров</th>
                        <th>кол-во комментариев</th>
                        <th><i className="fa fa-pencil" aria-hidden="true"></i></th>
                        <th><i className="fa fa-trash" aria-hidden="true"></i></th>
                    </tr>
                </thead>
                <tbody>
                {
                    posts.map(function (post, index) {
                        return <tr key={index}>
                            <td>{post.id}</td>
                            <td>{post.author.name + " " + post.author.surname}</td>
                            <td>{post.title}</td>
                            <td>{post.created_at}</td>
                            <td>{post.updated_at}</td>
                            <td>{post.views}</td>
                            <td>{post.comments.length}</td>
                            <td><NavLink to={'/admin/posts/' + post.id + '/edit'} className="admin-table-icon"><i className="fa fa-pencil" aria-hidden="true"></i></NavLink></td>
                            <td><NavLink to={'/admin/posts/' + post.id + '/delete'} onClick={removePost} data-id={post.id} className="admin-table-icon"><i className="fa fa-trash" aria-hidden="true"></i></NavLink></td>
                        </tr>
                    })
                }
                </tbody>
            </table>);
        }
    }

    render() {
        return (
            !this.state.dataIsLoaded ? (<Spinner/>) : (
                <React.Fragment>
                    <div className="admin-editlist-header mb-5">
                        <div><h3>Список статей</h3></div>
                        <div>
                            <NavLink to="/admin/posts/create">
                                <button className="btn">Создать статью</button>
                            </NavLink>
                        </div>
                    </div>
                    {this.renderPostList(this.state.posts)}
                </React.Fragment>
            )
        );
    }
}

export default AdminPostsList;
