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
            categories: [],
            authors: [],
            tags: [],
            dateSince: '',
            dateUntil: ''
        };
        this.datepickersSpellcheck = this.datepickersSpellcheck.bind(this);
        this.localizer = this.localizer.bind(this);
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
            .get('/api/categorieswithposts')
            .then(response => {
                response.data.map(author => {
                    console.log();
                });
                this.setState({categories: response.data.map( category => category.category)});
            });
    }

    getPostsAuthors() {
        axios
            .get('/api/authorswithposts')
            .then(response => {
                this.setState({authors: response.data.map( author => author.name + " " + author.surname )});
            });
    }

    getPostsTags() {
        axios
            .get('/api/gettagswithposts')
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

    render() {
        const type = this.props.type;
        return (
            <div className="filter-wrapper">
                <div className={"filter filter-" + type}>
                    <div className="filter-header">
                        <h3>Фильтр публикаций</h3>
                    </div>
                    <div className="date-since">
                        <DateTimePicker
                            placeholder="От"
                            onChange={value => this.props.updateDateSinceFilter(value)}
                        />
                    </div>
                    <div className="date-until">
                        <DateTimePicker
                            placeholder="До"
                            onChange={value => this.props.updateDateUntilFilter(value)}
                        />
                    </div>
                    <div className="search-row">
                        <Search
                            placeholder="Поиск по названию и описанию"
                            onChange={value => this.props.updateSearchFilter(value)}
                        />
                    </div>
                    { (type !== 'category') && <div className="category-column">
                        <Multiselect
                            placeholder="Категория"
                            data={this.state.categories}
                            onChange={value => this.props.updateCategoryFilter(value)}
                        />
                    </div>}
                    { (type !== 'user') && <div className="author-column">
                        <Multiselect
                            placeholder="Автор"
                            data={this.state.authors}
                            onChange={value => this.props.updateAuthorFilter(value)}
                        />
                    </div>}
                    <div className="tag-column">
                        <Multiselect
                            placeholder="Тэг"
                            data={this.state.tags}
                            onChange={value => this.props.updateTagFilter(value)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
