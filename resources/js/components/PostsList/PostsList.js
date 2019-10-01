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
            dataIsLoaded: false
        };
        this.renderPosts = this.renderPosts.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/posts')
            .then(response => {
                this.setState({
                    posts: response.data,
                    dataIsLoaded: true
                });
            });
    }

    updateFilter(filter){
        this.setState({
            dataIsLoaded: false
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
                            dataIsLoaded: true
                        });
                    });
                });
        });
    }

    renderPosts(posts) {
        if (posts instanceof Array) {
            if(posts.length === 0) {
                return (<div>
                    <h3 className="text-center mt-5">Публикации не найдены</h3>
                </div>);
            }
            return (<div>
                {
                    posts.map(function (post, index) {
                        return <PostFolded
                            key={index}
                            post={post}
                        />;
                    })
                }
            </div>);
        }
    }

    render() {
        return (
            <div>
                <Filter
                    className={"mb-5"}
                    type={'default'}
                    updateFilter={this.updateFilter}
                />
                {
                    !this.state.dataIsLoaded ? (<Spinner />) :
                        (<React.Fragment>
                            {this.renderPosts(this.state.posts)}
                        </React.Fragment>)
                }
            </div>
        );
    }
}

export default PostsList;
