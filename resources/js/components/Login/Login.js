import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            loginData: {
                email: '',
                password: ''
            },
            validationErrors: {
                email: '',
                password: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            loginData: {
                ...this.state.loginData,
                [event.target.name]: event.target.value
            }
        });
    }

    loginSubmit(event){
        event.preventDefault();
        axios.post('/login', this.state.loginData)
            .then(response => {
                if(response.status === 200) {
                    this.props.history.push("/");
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
                <div className="offset-4 col-4 blog-card loginForm">
                    <form onSubmit={this.loginSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" value={this.state.loginData.email || ''} onChange={this.handleChange} name="email" id="email" autoComplete="email" required/>
                            {
                                this.state.validationErrors.email &&
                                <small className="form-text text-danger">{this.state.validationErrors.email[0]}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" className="form-control" value={this.state.loginData.password || ''} onChange={this.handleChange} name="password" id="password" autoComplete="password" required/>
                        </div>
                        <input type="submit" className="btn d-block mx-auto" value="Войти"/>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;
