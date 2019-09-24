import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            registerData: {
                name: '',
                surname: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            validationErrors: {
                name: '',
                surname: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            registerData: {
                ...this.state.registerData,
                [event.target.name]: event.target.value
            }
        });
    }

    registerSubmit(event){
        event.preventDefault();
        axios.post('/register', this.state.registerData)
            .then(response => {
                if(response.status === 200) {
                    this.props.history.push("/a/login");
                }
            })
            .catch(error => {
                this.setState({
                    validationErrors: error.response.data.errors
                });
            });
    }

    render() {

        return(
            <div className="row">
                <div className="offset-4 col-4 blog-card registerForm">
                    <form onSubmit={this.registerSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Имя</label>
                            <input type="text" className="form-control" value={this.state.registerData.name || ''} onChange={this.handleChange} name="name" id="name" autoComplete="name" required/>
                            {
                                this.state.validationErrors.name &&
                                <small className="form-text text-danger">{this.state.validationErrors.name[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Фамилия</label>
                            <input type="text" className="form-control" value={this.state.registerData.surname || ''} onChange={this.handleChange} name="surname" id="surname" autoComplete="surname" required/>
                            {
                                this.state.validationErrors.surname &&
                                <small className="form-text text-danger">{this.state.validationErrors.surname[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" value={this.state.registerData.email || ''} onChange={this.handleChange} name="email" id="email" autoComplete="email" required/>
                            {
                                this.state.validationErrors.email &&
                                <small className="form-text text-danger">{this.state.validationErrors.email[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" className="form-control" value={this.state.registerData.password || ''} onChange={this.handleChange} name="password" id="password" autoComplete="password" required/>
                            {
                                this.state.validationErrors.password &&
                                <small className="form-text text-danger">{this.state.validationErrors.password[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_confirmation">Подтверждение пароля</label>
                            <input type="password" className="form-control" value={this.state.registerData.password_confirmation || ''} onChange={this.handleChange} name="password_confirmation" id="password_confirmation" autoComplete="password" required/>
                        </div>
                        <input type="submit" className="btn d-block mx-auto" value="Зарегистрироваться"/>
                    </form>
                </div>
            </div>
        );
    }

}

export default Register;
