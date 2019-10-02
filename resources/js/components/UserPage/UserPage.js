import React, { Component } from 'react';
import axios from "axios";
import Filter from "../Filter/Filter";
import Spinner from "../Spinner/Spinner";
import PostsList from "../PostsList/PostsList";

class UserPage extends PostsList {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            posts: {},
            filter: {
                category: '',
                author: '',
                tag: '',
                search: '',
                dateSince: '',
                dateUntil: ''
            },
            categoryFilter: [],
            tagFilter: [],
            searchFilter: [],
            dateSinceFilter: '',
            dateUntilFilter: '',
            dataIsLoaded: false
        };
        this.toPage = this.toPage.bind(this);
    }

    componentWillMount() {
        axios.all([
            axios.get('/api/users/' + this.props.match.params.id),
            axios.get('/api/getuserposts/' + this.props.match.params.id)
        ])
            .then(axios.spread((firstResponse, secondResponse) => {
                this.setState({
                    user: firstResponse.data,
                    posts: secondResponse.data,
                }, () => {
                    this.setState({
                        dataIsLoaded: true,
                        postsIsLoaded: true
                    });
                });
            }));
    }

    toPage(event){
        event.preventDefault();
        this.setState({
            postsIsLoaded: false
        });
        axios
            .get('/api/getuserposts/' + this.props.match.params.id + '?page=' + event.target.innerText, {
                params: this.state.filter
            })
            .then(response => {
                this.setState({
                    posts: response.data
                }, () => {
                    this.setState({
                        postsIsLoaded: true
                    });
                });
            });
    }

    updateFilter(filter){
        this.setState({
            postsIsLoaded: false
        });
        this.setState({
            filter: {
                ...this.state.filter,
                ...filter
            }
        }, () => {
            axios.get('/api/getuserposts/' + this.props.match.params.id, {
                params: this.state.filter
            })
                .then(response => {
                    this.setState({
                        posts: response.data
                    }, () => {
                        this.setState({
                            postsIsLoaded: true
                        });
                    });
                });
        });
    }

    render() {
        const dataIsLoaded = this.state.dataIsLoaded;
        return (
            <div className="user-page">{
                !dataIsLoaded ? (<Spinner />) : (
                    <div>
                        <div className="blog-card user-info">
                            <div className="photo-wrapper">
                                <img src={this.state.user.photo} alt=""/>
                            </div>
                            <div className="info-wrapper">
                                <h3>{this.state.user.name + " " + this.state.user.surname}</h3>
                                <p><span>Описание:</span> {this.state.user.description}</p>
                                <p><span>Количество статей:</span> {this.state.user.posts_count}</p>
                            </div>
                        </div>

                        <Filter
                            className={"mt-5 mb-5"}
                            type={'user'}
                            updateFilter={this.updateFilter}
                        />

                        {
                            !this.state.postsIsLoaded ? (<Spinner />) :
                                (<React.Fragment>
                                    {this.renderPosts(this.state.posts)}
                                </React.Fragment>)
                        }
                    </div>
                )
            }
            </div>
        );
    }
}

export default UserPage;
