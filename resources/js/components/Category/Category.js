import React, {Component} from 'react';
import PostsList from "../PostsList/PostsList";
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import Filter from "../Filter/Filter";
import TopAuthors from "../TopAuthors/TopAuthors";

class Category extends PostsList {

    constructor(props) {
        super(props);
        this.state = {
            category: {},
            posts: [],
            filter: {
                category: '',
                author: '',
                tag: '',
                search: '',
                dateSince: '',
                dateUntil: ''
            },
            dataIsLoaded: false,
            postsIsLoaded: false
        };
        this.updateFilter = this.updateFilter.bind(this);
        this.toPage = this.toPage.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/categories/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    category: response.data.category,
                    posts: response.data.posts
                }, () => {
                    this.setState({
                        dataIsLoaded: true,
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
            axios.get('/api/categories/' + this.props.match.params.id, {
                params: this.state.filter
            })
                .then(response => {
                    this.setState({
                        posts: response.data.posts
                    }, () => {
                        this.setState({
                            postsIsLoaded: true
                        });
                    });
                });
        });
    }

    toPrevPage(){
        event.preventDefault();
        this.setState({
            postsIsLoaded: false
        });
        axios
            .get(this.state.posts.prev_page_url, {
                params: this.state.filter
            })
            .then(response => {
                this.setState({
                    posts: response.data.posts
                }, () => {
                    this.setState({
                        postsIsLoaded: true
                    });
                });
            });
    }

    toPage(event){
        event.preventDefault();
        this.setState({
            postsIsLoaded: false
        });
        axios
            .get('/api/categories/' + this.props.match.params.id + '/?page=' + event.target.innerText, {
                params: this.state.filter
            })
            .then(response => {
                this.setState({
                    posts: response.data.posts
                }, () => {
                    this.setState({
                        postsIsLoaded: true
                    });
                });
            });
    }

    toNextPage(){
        event.preventDefault();
        this.setState({
            postsIsLoaded: false
        });
        axios
            .get(this.state.posts.next_page_url, {
                params: this.state.filter
            })
            .then(response => {
                this.setState({
                    posts: response.data.posts
                }, () => {
                    this.setState({
                        postsIsLoaded: true
                    });
                });
            });
    }

    render() {
        const dataIsLoaded = this.state.dataIsLoaded;
        return (
            <div className="category-page">
                {
                    !dataIsLoaded ? (<Spinner/>) : (
                        <React.Fragment>
                            <span className="badge badge-primary category-page-title">{"Категория " + this.state.category.category}</span>
                            <div className="row">
                                <div className="col-9">
                                    <Filter
                                        className={"mb-5"}
                                        type={'category'}
                                        updateFilter={this.updateFilter}
                                    />

                                    {
                                        !this.state.postsIsLoaded ? (<Spinner />) :
                                            (<React.Fragment>
                                                {this.renderPosts(this.state.posts)}
                                            </React.Fragment>)
                                    }
                                </div>
                                <div className="col-3">
                                    <TopAuthors />
                                </div>
                            </div>
                        </React.Fragment>

                    )
                }
            </div>
        );
    }
}

export default Category;
