import React, { Component } from 'react';
import axios from 'axios';
import DropdownList from "react-widgets/lib/DropdownList";

class AdminCreatePost extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            author: {},
            post: {
                author_id: 0,
            }
        };
    }

    componentWillMount() {
        axios.get('/api/user')
            .then(response => {
               console.log(response.data);
               this.setState({users: response.data.map((user, index)=>{
                    return {id: user.id, fullname: user.name + " " + user.surname}
                   })});
            });
    }

    render() {

        return(
            <div className="admin-post-create">
                <h3 className="page-header">Создание статьи</h3>
                <form className="post-create-form" onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="postAuthor">Автор</label>
                        <DropdownList
                            placeholder="Пользователь"
                            data={this.state.users}
                            value={this.state.author}
                            valueField="id"
                            textField="fullname"
                            onChange={value => this.setState({
                                    author: value
                                }
                            )}
                        />
                    </div>
                    {/*<div className="form-group">
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
                    <div className="form-group">
                        <label htmlFor="postCategory">Категория</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="postTags">Тэги</label>
                    </div>*/}
                    <button type="submit" className="btn">Сохранить</button>
                </form>
            </div>
        );
    }
}

export default AdminCreatePost;
