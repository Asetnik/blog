import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import {NavLink} from "react-router-dom";

class AdminUsersList extends Component {
    constructor(props){
        super(props);
        this.state= {
            users: [],
            dataIsLoaded: false
        };
        this.renderUsersList = this.renderUsersList.bind(this);
    }

    componentWillMount() {
        axios.get('/api/users')
            .then(response => {
                this.setState({
                    users: response.data
                }, () => {
                    this.setState({
                        dataIsLoaded: true
                    });
                });
            });
    }

    renderUsersList(users){
        let removeUser = event => {
            event.preventDefault();
            let id = Number(event.target.parentNode.getAttribute("data-id"));
            axios.delete('/api/users/' + id)
                .then(response => {
                    if(response.status === 200) {
                        this.setState({
                            users: this.state.users.filter(user => {return user.id !== id})
                        });
                    }
                });
        };
        if (users instanceof Array) {
            if(users.length === 0) {
                return (<div>
                    <h3 className="text-center mt-5">Пользователи не найдены</h3>
                </div>);
            }
            return (<table className="table table-striped table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>id пользователя</th>
                    <th>имя</th>
                    <th>фамилия</th>
                    <th>email</th>
                    <th>статус</th>
                    <th>роль</th>
                    <th>дата создания</th>
                    <th>дата изменения</th>
                    <th><i className="fa fa-pencil" aria-hidden="true"></i></th>
                    <th><i className="fa fa-trash" aria-hidden="true"></i></th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(function (user, index) {
                        return <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.status_id === 1 && <p className="text-success">{user.status.status}</p>}
                                {user.status_id === 2 && <p className="text-danger">{user.status.status}</p>}
                            </td>
                            <td>
                                {user.role_id === 1 && <p className="">{user.role.role}</p>}
                                {user.role_id === 2 && <p className="text-primary">{user.role.role}</p>}
                                {user.role_id === 3 && <p className="text-success">{user.role.role}</p>}
                            </td>
                            <td>{user.created_at}</td>
                            <td>{user.updated_at}</td>
                            <td><NavLink to={'/admin/users/' + user.id + '/edit'} className="admin-table-icon"><i className="fa fa-pencil" aria-hidden="true"></i></NavLink></td>
                            <td><NavLink to={'/admin/users/' + user.id + '/delete'} onClick={removeUser} data-id={user.id} className="admin-table-icon"><i className="fa fa-trash" aria-hidden="true"></i></NavLink></td>
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
                        <div><h3>Список пользователей</h3></div>
                        <div>
                            <NavLink to="/admin/users/create">
                                <button className="btn">Добавить пользователя</button>
                            </NavLink>
                        </div>
                    </div>
                    {this.renderUsersList(this.state.users)}
                </React.Fragment>
            )
        );
    }
}

export default AdminUsersList;
