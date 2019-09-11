import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";

class AdminEditPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            post: {},
            dataIsLoaded: false
        };
    }

    componentWillMount() {
        axios.get('/api/post/' + this.props.match.params.id)
            .then(response => {
                this.setState({post: response.data}, () => {
                    this.setState({dataIsLoaded: true});
                });
            });
    }

    render() {
        return(
            !this.state.dataIsLoaded ? (<Spinner/>) : (
                <div className="post-edit">
                    <h3 className="page-header">Публикация №{this.state.post.id}</h3>
                    <form className="post-edit-form">
                        <div className="form-group">
                            <label htmlFor="postAuthor">Автор</label>
                            <input type="text" className="form-control" id="postAuthor" placeholder="Автор" value={this.state.post.author.name + " " + this.state.post.author.surname}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postTitle">Заголовок</label>
                            <input type="text" className="form-control" id="postTitle" placeholder="Заголовок" value={this.state.post.title}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postDescription">Описание</label>
                            <input type="text" className="form-control" id="postDescription" placeholder="Описание" value={this.state.post.description}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postContent">Текст публикации</label>
                            <textarea rows="5" className="form-control" id="postContent" placeholder="Текст публикации" value={this.state.post.content}/>
                        </div>
                        <button type="submit" className="btn">Сохранить</button>
                    </form>
                </div>
            )
        );
    }
}

export default AdminEditPost;
