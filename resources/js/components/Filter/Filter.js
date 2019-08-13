import React, { Component } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Search from '../Search/Search';
import axios from 'axios';

class Filter extends Component{

    constructor(props){
        super(props);
        this.state = {
            filterDisplayed: false,
            categories: [],
            authors: [],
            tags: [],
            dateSince: '',
            dateUntil: ''
        };
        this.datepickersSpellcheck = this.datepickersSpellcheck.bind(this);
        this.localizer = this.localizer.bind(this);
        this.filterBtnClick = this.filterBtnClick.bind(this);
        this.getPostsCategories = this.getPostsCategories.bind(this);
        this.getPostsAuthors = this.getPostsAuthors.bind(this);
        this.getPostsTags = this.getPostsTags.bind(this);
    }

    componentWillMount() {
        this.localizer();
        this.getPostsCategories();
        this.getPostsAuthors();
        this.getPostsTags();
    }

    getPostsCategories() {
        axios
            .get('/api/getpostscategories')
            .then(response => {
                this.setState({categories: response.data.map( category => category.category)});
            });
    }

    getPostsAuthors() {
        axios
            .get('/api/getpostsauthors')
            .then(response => {
                this.setState({authors: response.data.map( author => author.name + " " + author.surname )});
            });
    }

    getPostsTags() {
        axios
            .get('/api/getpoststags')
            .then(response => {
                this.setState({tags: response.data.map( tag => tag.tag)});
            });
    }

    localizer() {
        Moment.locale('ru');
        momentLocalizer();
    }

    componentDidUpdate() {
        this.datepickersSpellcheck();
    }

    datepickersSpellcheck() {
        let datepickers = document.getElementsByClassName('rw-input');
        for (let i = 0; i < datepickers.length; i++) {
            datepickers[i].setAttribute("spellcheck", "false");
        }
    }

    filterBtnClick(event) {
        this.setState({
            filterDisplayed: !this.state.filterDisplayed
        });
    }

    render() {
        const type = this.props.type;
        const filterDisplayed = this.state.filterDisplayed;
        return (
            <div className="filter-wrapper">
                { filterDisplayed &&
                    (<div className={"filter filter-" + type}>
                        <div className="filter-header">
                            <h3>Фильтр публикаций</h3>
                        </div>
                        <div className="date-since">
                            <DateTimePicker
                                placeholder="От"
                            />
                        </div>
                        <div className="date-until">
                            <DateTimePicker
                                placeholder="До"
                            />
                        </div>
                        <div className="search-row">
                            <Search />
                        </div>
                        { (type !== 'category') && <div className="category-column">
                            <Multiselect
                                placeholder="Категория"
                                data={this.state.categories}
                                onChange={value => this.props.updateCategoryFilter(value)}
                            />
                        </div>}
                        <div className="author-column">
                            <Multiselect
                                placeholder="Автор"
                                data={this.state.authors}
                                onChange={value => this.props.updateAuthorFilter(value)}
                            />
                        </div>
                        <div className="tag-column">
                            <Multiselect
                                placeholder="Тэг"
                                data={this.state.tags}
                                onChange={value => this.props.updateTagFilter(value)}
                            />
                        </div>
                    </div>)
                }
                {filterDisplayed ?
                    (<a className="text-link filter-toggle" onClick={this.filterBtnClick}>
                        <i className="fa fa-arrow-up" aria-hidden="true"></i> Свернуть фильтр <i
                        className="fa fa-arrow-up" aria-hidden="true"></i>
                    </a>)
                    : (<a className="text-link filter-toggle" onClick={this.filterBtnClick}>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i> Развернуть фильтр <i
                        className="fa fa-arrow-down" aria-hidden="true"></i>
                    </a>)
                }
            </div>
        );
    }
}

export default Filter;
