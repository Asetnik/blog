import React, { Component } from 'react';
import axios from 'axios';
import DropdownList from "react-widgets/lib/DropdownList";
import Spinner from "../Spinner/Spinner";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import Multiselect from "react-widgets/lib/Multiselect";

class EditPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            categories: [],
            tags: [],
            post: {
                author_id: undefined,
                created_at: undefined,
                title: '',
                description: '',
                content: '',
                category_id: undefined,
                tags_id: [],
            },
            validationErrors: {
                author: '',
                created_at: '',
                title: '',
                description: '',
                content: '',
                category_id: ''
            },
            dataIsLoaded: false
        };
        this.localizer = this.localizer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.datepickersSpellcheck = this.datepickersSpellcheck.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        this.localizer();

        if(this.props.type === "adminEdit") {
            axios.all([
                axios.get('/api/categories'),
                axios.get('/api/tags'),
                axios.get('/api/posts/' + this.props.match.params.id)
            ])
                .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {
                    this.setState({
                        categories: firstResponse.data,
                        tags: secondResponse.data,
                        post: {...thirdResponse.data,
                            tags_id: thirdResponse.data.tags.map((tag) => {
                                return tag.id
                            })}
                    }, () => {
                        this.setState({
                            dataIsLoaded: true
                        });
                    });
                }))
                .catch(error => console.log(error));
        }

        if(this.props.type === "adminCreate") {
            axios.all([axios.get('/api/users'),
                axios.get('/api/categories'),
                axios.get('/api/tags')
            ])
                .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {
                    this.setState({
                        users: firstResponse.data.map((user)=>{
                            return {id: user.id, fullname: user.name + " " + user.surname}
                        }),
                        categories: secondResponse.data,
                        tags: thirdResponse.data,
                    }, () => {
                        this.setState({
                            dataIsLoaded: true
                        });
                    });
                }))
                .catch(error => console.log(error));
        }

        if(this.props.type === "create") {
            axios.all([axios.get('/api/user'),
                axios.get('/api/categories'),
                axios.get('/api/tags')
            ])
                .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {
                    this.setState({
                        post: {
                            ...this.state.post,
                            author_id: firstResponse.data.id
                        },
                        categories: secondResponse.data,
                        tags: thirdResponse.data,
                    }, () => {
                        this.setState({
                            dataIsLoaded: true
                        });
                    });
                }))
                .catch(error => console.log(error));
        }
    }

    componentDidUpdate() {
        this.datepickersSpellcheck();
    }

    localizer() {
        Moment.locale('ru');
        momentLocalizer();
    }

    handleChange(){
        this.setState({
            post: {
                ...this.state.post,
                [event.target.name]: event.target.value
            }
        });
    }

    datepickersSpellcheck() {
        let datepickers = document.getElementsByClassName('rw-input');
        for (let i = 0; i < datepickers.length; i++) {
            datepickers[i].setAttribute("spellcheck", "false");
        }
    }

    submitForm(event){
        event.preventDefault();
        const Type = this.props.type;
        if(Type === "adminEdit") {
            axios.put('/api/posts/' + this.props.match.params.id, this.state.post)
                .then(response => {
                    if(response.status === 200) {
                        this.props.history.push("/admin/posts");
                    }
                })
                .catch(error => {
                    this.setState({
                        validationErrors: error.response.data.errors
                    });
                });
        }
        if(Type === "adminCreate" || Type === "create") {
            if(Type === "create"){
                this.setState({
                    post: {
                        ...this.state.post,
                        created_at: new Date()
                    }
                });
            }
            axios.post('/api/posts', this.state.post)
                .then(response => {
                    if(response.status === 200) {
                        if(Type === "adminCreate"){
                            this.props.history.push("/admin/posts");
                        } else {
                            this.props.history.push("/");
                        }
                    }
                })
                .catch(error => {
                    this.setState({
                        validationErrors: error.response.data.errors
                    });
                });
        }
    }

    render() {
        const Type = this.props.type;

        return(
            !this.state.dataIsLoaded ? <Spinner /> :
                <div className="admin-post-create">
                    {(Type === "adminCreate" || Type === "create") && <h3 className="page-header mb-3">Создание статьи</h3>}
                    {Type === "adminEdit" && <h3 className="page-header mb-3">Редактирование статьи</h3>}
                    <form className="post-create-form" onSubmit={this.submitForm}>
                        {Type !== "create" &&
                            <React.Fragment>
                                <div className="form-group">
                                    <label htmlFor="postAuthor">Автор</label>
                                    {Type === "adminEdit" &&
                                    <DropdownList
                                        value={this.state.post.author.name + " " + this.state.post.author.surname}
                                        disabled
                                        onChange={() => {
                                        }}
                                    />
                                    }

                                    {Type === "adminCreate" &&
                                        <DropdownList
                                            placeholder="Автор"
                                            data={this.state.users}
                                            valueField="id"
                                            textField="fullname"
                                            onChange={value => this.setState({
                                                    post: {
                                                        ...this.state.post,
                                                        author_id: value.id
                                                    }
                                                }
                                            )}
                                        />
                                    }
                                    {
                                        this.state.validationErrors.author &&
                                        <small
                                            className="form-text text-danger">{this.state.validationErrors.author[0]}</small>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="postPubDate">Дата публикации</label>
                                    {Type === "adminEdit" &&
                                        <DateTimePicker
                                            placeholder="Дата публикации"
                                            value={new Date(this.state.post.created_at)}
                                            disabled
                                            onChange={() => {}}
                                        />
                                    }
                                    {Type === "adminCreate" &&
                                        <DateTimePicker
                                            placeholder="Дата публикации"
                                            onChange={value => this.setState({
                                                post: {
                                                    ...this.state.post,
                                                    created_at: value
                                                }
                                            })}
                                        />
                                    }
                                    {
                                        this.state.validationErrors.created_at &&
                                        <small className="form-text text-danger">{this.state.validationErrors.created_at[0]}</small>
                                    }
                                </div>
                            </React.Fragment>
                        }
                        <div className="form-group">
                            <label htmlFor="postTitle">Заголовок</label>
                            <input type="text" className="form-control" id="postTitle" name="title" placeholder="Заголовок" onChange={this.handleChange} value={this.state.post.title}/>
                            {
                                this.state.validationErrors.title &&
                                <small className="form-text text-danger">{this.state.validationErrors.title[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="postDescription">Описание</label>
                            <input type="text" className="form-control" id="postDescription" name="description" placeholder="Описание" onChange={this.handleChange} value={this.state.post.description}/>
                            {
                                this.state.validationErrors.description &&
                                <small className="form-text text-danger">{this.state.validationErrors.description[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="postContent">Текст публикации</label>
                            <textarea rows="5" className="form-control" id="postContent" name="content" placeholder="Текст публикации" onChange={this.handleChange} value={this.state.post.content}/>
                            {
                                this.state.validationErrors.content &&
                                <small className="form-text text-danger">{this.state.validationErrors.content[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="postCategory">Категория</label>
                            <DropdownList
                                placeholder="Категория"
                                data={this.state.categories}
                                valueField="id"
                                textField="category"
                                value={this.state.post.category_id}
                                onChange={value => this.setState({
                                        post: {
                                            ...this.state.post,
                                            category_id: value.id
                                        }
                                    }
                                )}
                            />
                            {
                                this.state.validationErrors.category_id &&
                                <small className="form-text text-danger">{this.state.validationErrors.category_id[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="postTags">Тэги</label>
                            {
                                Type === "adminEdit" && <Multiselect
                                    placeholder="Тэги"
                                    data={this.state.tags}
                                    value={this.state.post.tags}
                                    valueField="id"
                                    textField="tag"
                                    onChange={value => {
                                        this.setState({
                                            post: {
                                                ...this.state.post,
                                                tags_id: value.map((item) => {
                                                    return item.id;
                                                }),
                                                tags: value
                                            }
                                        }
                                    )}}
                                />
                            }
                            {
                                (Type === "adminCreate" || Type === "create") &&
                                    <Multiselect
                                        placeholder="Тэги"
                                        data={this.state.tags}
                                        valueField="id"
                                        textField="tag"
                                        onChange={value => this.setState({
                                                post: {
                                                    ...this.state.post,
                                                    tags_id: value.map((item) => {
                                                        return item.id;
                                                    })
                                                }
                                            }
                                        )}
                                    />
                            }
                        </div>
                        <button type="submit" className="btn mt-3">Сохранить</button>
                    </form>
                </div>
        );
    }
}

export default EditPost;