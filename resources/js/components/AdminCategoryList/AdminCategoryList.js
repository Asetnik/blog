import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import {NavLink} from "react-router-dom";

class AdminCategoryList extends Component {
    constructor(props){
        super(props);
        this.state= {
            categories: [],
            dataIsLoaded: false
        };
        this.renderCategoriesList = this.renderCategoriesList.bind(this);
    }

    componentWillMount() {
        axios.get('/api/categories')
            .then(response => {
                this.setState({
                    categories: response.data
                }, () => {
                    this.setState({
                        dataIsLoaded: true
                    });
                });
            });
    }

    renderCategoriesList(categories){
        let removeCategory = event => {
            event.preventDefault();
            let id = Number(event.target.parentNode.getAttribute("data-id"));
            axios.delete('/api/categories/' + id)
                .then(response => {
                    if(response.status === 200) {
                        this.setState({
                            categories: this.state.categories.filter(category => {return category.id !== id})
                        });
                    }
                });
        };
        if (categories instanceof Array) {
            if(categories.length === 0) {
                return (<div>
                    <h3 className="text-center mt-5">Категории не найдены</h3>
                </div>);
            }
            return (<table className="table table-striped table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>id категории</th>
                    <th>категория</th>
                    <th><i className="fa fa-pencil" aria-hidden="true"></i></th>
                    <th><i className="fa fa-trash" aria-hidden="true"></i></th>
                </tr>
                </thead>
                <tbody>
                {
                    categories.map(function (category, index) {
                        return <tr key={index}>
                            <td>{category.id}</td>
                            <td>{category.category}</td>
                            <td><NavLink to={'/admin/categories/' + category.id + '/edit'} className="admin-table-icon"><i className="fa fa-pencil" aria-hidden="true"></i></NavLink></td>
                            <td><NavLink to={'/admin/categories/' + category.id + '/delete'} onClick={removeCategory} data-id={category.id} className="admin-table-icon"><i className="fa fa-trash" aria-hidden="true"></i></NavLink></td>
                        </tr>
                    })
                }
                </tbody>
            </table>);
        }
    }

    render() {

        return(
            !this.state.dataIsLoaded ? (<Spinner/>) : (
                <React.Fragment>
                    <div className="admin-editlist-header mb-5">
                        <div><h3>Список категорий</h3></div>
                        <div>
                            <NavLink to="/admin/categories/create">
                                <button className="btn">Добавить категорию</button>
                            </NavLink>
                        </div>
                    </div>
                    {this.renderCategoriesList(this.state.categories)}
                </React.Fragment>
            )
        );
    }
}

export default AdminCategoryList;
