import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import {NavLink} from "react-router-dom";

class AdminPostList extends Component{
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
                            <td>{post.views}</td>
                            <td>{post.comments.length}</td>
                            <td><NavLink to={'/admin/post/edit/' + post.id} className="admin-postlist-table-icon"><i className="fa fa-pencil" aria-hidden="true"></i></NavLink></td>
                            <td><i className="fa fa-trash" aria-hidden="true"></i></td>
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
                    <div className="admin-postlist-header mb-5">
                        <div><h3>Список статей</h3></div>
                        <div>
                            <NavLink to="/admin/post/create">
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

export default AdminPostList;
