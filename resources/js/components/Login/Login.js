import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    loginSubmit(event){
        event.preventDefault();
        axios.post('/login', this.state)
            .then(response => {
                console.log(response);
                this.props.history.push("/");
            });
    }

    render() {

        return(
            <div className="row">
                <div className="offset-4 col-4 blog-card loginForm">
                    <form onSubmit={this.loginSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" value={this.state.email || ''} onChange={this.handleChange} name="email" id="email" autoComplete="email" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" className="form-control" value={this.state.password || ''} onChange={this.handleChange} name="password" id="password" autoComplete="password" required/>
                        </div>
                        <input type="submit" className="btn d-block mx-auto" value="Войти"/>
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;
