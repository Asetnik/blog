import React, { Component } from 'react';
import axios from 'axios';
import PostFolded from "../Post/PostFolded/PostFolded";
import Spinner from "../Spinner/Spinner";
import Filter from "../Filter/Filter";

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        this.renderPosts = this.renderPosts.bind(this);
        this.parseSearchURL = this.parseSearchURL.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.toPrevPage = this.toPrevPage.bind(this);
        this.toPage = this.toPage.bind(this);
        this.toNextPage = this.toNextPage.bind(this);
    }

    componentWillMount() {
        if(this.props.location.search){
            this.setState({dataIsLoaded: true});
            let filter = this.parseSearchURL(this.props.location.search);
            this.setState({
                filter: filter
            });
            this.updateFilter(filter);
        } else {
            axios
                .get('/api/posts')
                .then(response => {
                    this.setState({
                        posts: response.data,
                        dataIsLoaded: true,
                        postsIsLoaded: true
                    });
                });
        }
    }

    parseSearchURL(url){
        let substr = url.slice(1);
        let params = {};
        while(substr.indexOf('=') !== -1){
            let paramEnd = substr.indexOf('=');
            if(substr.indexOf('&') !== -1){
                params[substr.slice(0, paramEnd)] = Number(substr.slice(paramEnd + 1, substr.indexOf('&')));
                substr = substr.slice(substr.indexOf('&') + 1);
            } else {
                params[substr.slice(0, paramEnd)] = Number(substr.slice(paramEnd + 1));
                substr = substr.slice(paramEnd + 1);
            }
        }
        return params;
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
            axios.get('/api/posts', {
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
                    posts: response.data
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
            .get('/api/posts?page=' + event.target.innerText, {
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
                    posts: response.data
                }, () => {
                    this.setState({
                        postsIsLoaded: true
                    });
                });
            });
    }

    renderPosts(posts) {
        if (posts.data instanceof Array) {
            if(posts.data.length === 0) {
                return (<div>
                    <h3 className="text-center mt-5">Публикации не найдены</h3>
                </div>);
            }
            let pages = [];
            for(let i = 1; i <= posts.last_page; i++){
                pages.push(i);
            }
            return (<div>
                {
                    posts.data.map(function (post, index) {
                        return <PostFolded
                            key={index}
                            post={post}
                        />;
                    })
                }
                <nav>
                    <ul className="pagination justify-content-center">
                        {
                            (posts.current_page === 1 ) ?
                                (<li className="page-item disabled">
                                    <p className="page-link" tabIndex="-1">Предыдущая</p>
                                </li>) :
                                (<li className="page-item">
                                    <p className="page-link" onClick={this.toPrevPage}>Предыдущая</p>
                                </li>)
                        }
                        {
                            pages.map((page, index) => {
                                if(page === posts.current_page){
                                    return <li className="page-item active" key={index}><p className="page-link">{page}<span
                                        className="sr-only">(current)</span></p></li>
                                }
                                return <li className="page-item" key={index}><p className="page-link" onClick={this.toPage}>{page}</p></li>
                            })
                        }
                        {
                            (posts.current_page === posts.last_page ) ?
                                (<li className="page-item disabled">
                                    <p className="page-link" tabIndex="-1">Следующая</p>
                                </li>) :
                                (<li className="page-item">
                                    <p className="page-link" onClick={this.toNextPage}>Следующая</p>
                                </li>)
                        }
                    </ul>
                </nav>
            </div>);
        }
    }

    render() {
        return (
            !this.state.dataIsLoaded ? <Spinner /> :
            <div>
                <Filter
                    className={"mb-5"}
                    type={'default'}
                    updateFilter={this.updateFilter}
                    filter={this.state.filter}
                />
                {
                    !this.state.postsIsLoaded ? (<Spinner />) :
                        (<React.Fragment>
                            {this.renderPosts(this.state.posts)}
                        </React.Fragment>)
                }
            </div>
        );
    }
}

export default PostsList;
