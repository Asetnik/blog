import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";

class AdminEditCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: {},
            validationErrors: {
                category: ''
            },
            dataIsLoaded: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        if(this.props.type === "create"){
            this.setState({
                dataIsLoaded: true
            });
        }
        if(this.props.type === "edit"){
            axios.get('/api/categories/' + this.props.match.params.id + '/edit')
                .then(response => {
                    this.setState({category: response.data}, () => {
                        this.setState({dataIsLoaded: true});
                    });
                })
        }
    }

    handleChange(event){
        this.setState({
            category: {
                ...this.state.category,
                [event.target.name]: event.target.value
            }
        });
    }

    submitForm(event){
        event.preventDefault();
        if(this.props.type === "create"){
            axios.post('/api/categories', this.state.category)
                .then(response => {
                        if(response.status === 200) {
                            this.props.history.push("/admin/categories");
                        }
                    }
                )
                .catch(error => {
                    this.setState({
                        validationErrors: error.response.data.errors
                    });
                });
        }
        if(this.props.type === "edit"){
            axios.put('/api/categories/' + this.state.category.id, this.state.category)
                .then(response => {
                    if(response.status === 200) {
                        this.props.history.push("/admin/categories");
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
            <div className="edit-category">
                {this.props.type === "create" && <h3 className="page-header mb-3">Создание категории</h3>}
                {this.props.type === "edit" && <h3 className="page-header mb-3">Редактирование категории</h3>}
                <form className="post-create-form" onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="category">Категория</label>
                        <input type="text" className="form-control" id="category" name="category" placeholder="Категория" onChange={this.handleChange} value={this.state.category.category}/>
                        {
                            this.state.validationErrors.category &&
                            <small className="form-text text-danger">{this.state.validationErrors.category[0]}</small>
                        }
                    </div>
                    <button type="submit" className="btn mt-3">Сохранить</button>
                </form>
            </div>
        );
    }
}

export default AdminEditCategory;
