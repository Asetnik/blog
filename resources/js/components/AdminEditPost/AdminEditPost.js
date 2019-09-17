import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";

class AdminEditPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            post: {},
            dataIsLoaded: false,
            editedData: {
                title: '',
                description: '',
                content: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        axios.get('/api/posts/' + this.props.match.params.id)
            .then(response => {
                this.setState({post: response.data}, () => {
                    this.setState({editedData: {
                            title: response.data.title,
                            description: response.data.description,
                            content: response.data.content
                        }}, () => {
                        this.setState({dataIsLoaded: true})
                    });
                });
            });
    }

    handleChange(event){
        this.setState({
            editedData: {
                ...this.state.editedData,
                [event.target.name]: event.target.value
            }
        });
    }

    submitForm(event) {
        event.preventDefault();
        axios.put('/api/posts/' + this.state.post.id, this.state.editedData)
            .then(response => {
                console.log(response);
            })
    }

    render() {
        return(
            !this.state.dataIsLoaded ? (<Spinner/>) : (
                <div className="admin-post-edit">
                    <h3 className="page-header">Публикация №{this.state.post.id}</h3>
                    <form className="post-edit-form" onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="postAuthor">Автор</label>
                            <input type="text" className="form-control" id="postAuthor" name="author" placeholder="Автор" readOnly value={this.state.post.author.name + " " + this.state.post.author.surname}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postTitle">Заголовок</label>
                            <input type="text" className="form-control" id="postTitle" name="title" placeholder="Заголовок" onChange={this.handleChange} value={this.state.editedData.title}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postDescription">Описание</label>
                            <input type="text" className="form-control" id="postDescription" name="description" placeholder="Описание" onChange={this.handleChange} value={this.state.editedData.description}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postContent">Текст публикации</label>
                            <textarea rows="5" className="form-control" id="postContent" name="content" placeholder="Текст публикации" onChange={this.handleChange} value={this.state.editedData.content}/>
                        </div>
                        <button type="submit" className="btn">Сохранить</button>
                    </form>
                </div>
            )
        );
    }
}

export default AdminEditPost;
