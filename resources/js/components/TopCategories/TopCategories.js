import React, { Component } from 'react'
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
import {Link} from "react-router-dom";
import CategoryTile from "../CategoryTile/CategoryTile";

class TopCategories extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            dataIsLoaded: false
        }
    }

    componentDidMount() {
        axios.get('/api/popularcategories')
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

    render() {
        return (
            <div className="blog-card top-categories mb-4">
                <h3 className="mb-3">5 популярных категорий</h3>
                {!this.state.dataIsLoaded ? <Spinner /> : (
                    <React.Fragment>
                        {
                            this.state.categories.map((category, index) => {
                                return <div key={index} className="float-left ml-2 mt-2">
                                        <CategoryTile
                                            category_id={category.id}
                                            category={category.category}
                                        />
                                    </div>
                            })
                        }
                        <div className="clearfix"></div>
                    </React.Fragment>
                )}
            </div>
        )
    }
}

export default TopCategories;
