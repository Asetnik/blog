import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import DropdownList from "react-widgets/lib/DropdownList";
import {connect} from "react-redux";

class EditUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            roles: [],
            statuses: [],
            user: {
                name: '',
                surname: '',
                patronymic: '',
                description: '',
                email: '',
                password: '',
                password_confirmation: '',
                status_id: '',
                role_id: ''
            },
            editedUser: {},
            validationErrors: {
                name: '',
                surname: '',
                patronymic: '',
                description: '',
                email: '',
                password: '',
                status_id: '',
                role_id: ''
            },
            dataIsLoaded: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        if(this.props.type === "adminCreate"){
            axios.all([
                axios.get('/api/roles'),
                axios.get('/api/statuses')
            ])
                .then(axios.spread((firstResponse, secondResponse) => {
                    this.setState({
                        roles: firstResponse.data,
                        statuses: secondResponse.data
                    }, () => {
                        this.setState({
                            dataIsLoaded: true
                        });
                    });
                }));
        }

        if(this.props.type === "adminEdit"){
            axios.all([
                axios.get('/api/roles'),
                axios.get('/api/statuses'),
                axios.get('/api/users/' + (this.props.match.params.id) + '/edit')
            ])
                .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {
                    this.setState({
                        roles: firstResponse.data,
                        statuses: secondResponse.data,
                        user: {
                            ...thirdResponse.data,
                            password: '',
                            password_confirmation: ''
                        }
                    }, () => {
                        this.setState({
                            dataIsLoaded: true
                        });
                    });
                }));
        }

        if(this.props.type === "edit"){
            axios.get('/api/users/' + (this.props.store.user.id ) + '/edit')
                .then(response => {
                    this.setState({
                        user: {
                            ...response.data,
                            patronymic: response.data.patronymic || ""
                        }
                    }, () => {
                        this.setState({
                            dataIsLoaded: true
                        });
                    });
                });
        }
    }

    handleChange(event){
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            },
            editedUser: {
                ...this.state.editedUser,
                [event.target.name]: event.target.value
            }
        });
    }

    submitForm(event){
        event.preventDefault();
        if(this.props.type === "adminCreate"){
            axios.post('/api/users', this.state.editedUser)
                .then(response => {
                        if(response.status === 200) {
                            this.props.history.push("/admin/users");
                        }
                    }
                )
                .catch(error => {
                    this.setState({
                        validationErrors: error.response.data.errors
                    });
                });
        }
        if(this.props.type === "adminEdit" || this.props.type === "edit"){
            axios.put('/api/users/' + this.state.user.id, this.state.editedUser)
                .then(response => {
                    if(response.status === 200) {
                        if(this.props.type === "adminEdit"){
                            this.props.history.push("/admin/users");
                        } else {
                            this.props.history.push("/myprofile");
                        }
                    }
                })
                .catch(error => {
                    this.setState({
                        validationErrors: error.response.data.errors
                    });
                })
        }
    }

    render() {

        return(
            !this.state.dataIsLoaded ? <Spinner /> :
                <div className="edit-user">
                    {this.props.type === "adminCreate" && <h3 className="page-header mb-3">Создание пользователя</h3>}
                    {this.props.type === "adminEdit" && <h3 className="page-header mb-3">Редактирование пользователя</h3>}
                    <form className="post-create-form" onSubmit={this.submitForm} autoComplete="true">
                        <div className="form-group">
                            <label htmlFor="name">Имя</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Имя" onChange={this.handleChange} value={this.state.user.name}/>
                            {
                                this.state.validationErrors.name &&
                                <small className="form-text text-danger">{this.state.validationErrors.name[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Фамилия</label>
                            <input type="text" className="form-control" id="surname" name="surname" placeholder="Фамилия" onChange={this.handleChange} value={this.state.user.surname}/>
                            {
                                this.state.validationErrors.surname &&
                                <small className="form-text text-danger">{this.state.validationErrors.surname[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="patronymic">Отчество</label>
                            <input type="text" className="form-control" id="patronymic" name="patronymic" placeholder="Отчество" onChange={this.handleChange} value={this.state.user.patronymic}/>
                            {
                                this.state.validationErrors.patronymic &&
                                <small className="form-text text-danger">{this.state.validationErrors.patronymic[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Описание</label>
                            <input type="text" className="form-control" id="description" name="description" placeholder="Описание" onChange={this.handleChange} value={this.state.user.description}/>
                            {
                                this.state.validationErrors.description &&
                                <small className="form-text text-danger">{this.state.validationErrors.description[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="text" className="form-control" id="email" name="email" placeholder="E-mail" onChange={this.handleChange} value={this.state.user.email} autoComplete="username"/>
                            {
                                this.state.validationErrors.email &&
                                <small className="form-text text-danger">{this.state.validationErrors.email[0]}</small>
                            }
                        </div>
                        {(this.props.type !== "edit") && <React.Fragment>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Пароль" onChange={this.handleChange} value={this.state.user.password} autoComplete="new-password"/>
                            {
                                this.state.validationErrors.password &&
                                <small className="form-text text-danger">{this.state.validationErrors.password[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_confirmation">Подтверждение пароля</label>
                            <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" placeholder="Подтверждение пароля" onChange={this.handleChange} value={this.state.user.password_confirmation} autoComplete="new-password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Статус</label>
                            <DropdownList
                                placeholder="Статус"
                                data={this.state.statuses}
                                valueField="id"
                                textField="status"
                                value={this.state.user.status_id}
                                onChange={value => this.setState({
                                        user: {
                                            ...this.state.user,
                                            status_id: value.id
                                        },
                                        editedUser: {
                                            ...this.state.editedUser,
                                            status_id: value.id
                                        }
                                    }
                                )}
                            />
                            {
                                this.state.validationErrors.status_id &&
                                <small className="form-text text-danger">{this.state.validationErrors.status_id[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Роль</label>
                            <DropdownList
                                placeholder="Роль"
                                data={this.state.roles}
                                valueField="id"
                                textField="role"
                                value={this.state.user.role_id}
                                onChange={value => this.setState({
                                        user: {
                                            ...this.state.user,
                                            role_id: value.id
                                        },
                                        editedUser: {
                                            ...this.state.editedUser,
                                            role_id: value.id
                                        }
                                    }
                                )}
                            />
                            {
                                this.state.validationErrors.role_id &&
                                <small className="form-text text-danger">{this.state.validationErrors.role_id[0]}</small>
                            }
                        </div>
                        </React.Fragment>}
                        <button type="submit" className="btn mt-3">Сохранить</button>
                    </form>
                </div>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(EditUser);
