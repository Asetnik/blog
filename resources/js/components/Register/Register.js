import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    registerSubmit(event){
        event.preventDefault();
        axios.post('/register', this.state)
            .then(response => {console.log(response)});
    }

    render() {

        return(
            <div className="row">
                <div className="offset-4 col-4 blog-card registerForm">
                    <form onSubmit={this.registerSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Имя</label>
                            <input type="text" className="form-control" value={this.state.name || ''} onChange={this.handleChange} name="name" id="name" autoComplete="name" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" value={this.state.email || ''} onChange={this.handleChange} name="email" id="email" autoComplete="email" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" className="form-control" value={this.state.password || ''} onChange={this.handleChange} name="password" id="password" autoComplete="password" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_confirmation">Подтверждение пароля</label>
                            <input type="password" className="form-control" value={this.state.password_confirmation || ''} onChange={this.handleChange} name="password_confirmation" id="password_confirmation" autoComplete="password" required/>
                        </div>
                        <input type="submit" className="btn d-block mx-auto" value="Зарегистрироваться"/>
                    </form>
                </div>
            </div>
        );
    }

}

export default Register;
