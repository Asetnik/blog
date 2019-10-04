import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import {Link} from "react-router-dom";

class TopAuthors extends Component{
    constructor(props){
        super(props);
        this.state = {
            authors: [],
            dataIsLoaded: false
        };
    }

    componentWillMount() {
        axios.get('/api/popularauthors')
            .then(response => {
                this.setState({authors: response.data});
            });
    }

    render() {
        return (
            <div className="blog-card top-authors">
                <h3 className="mb-3">5 популярных авторов</h3>
                {this.state.dataIsLoaded ? <Spinner /> : (
                    <React.Fragment>
                        {
                            this.state.authors.map((author, index) => {
                                return <div className="author-folded" key={index}>
                                    <Link to={'/users/' + author.id}><img src={author.photo} alt=""/></Link>
                                    <Link to={'/users/' + author.id} className="text-link author-name">{author.name + " " + author.surname}</Link>
                                </div>
                            })
                        }
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default TopAuthors;
