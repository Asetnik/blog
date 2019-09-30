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
                this.setState({categories: response.data});
            });
    }

    getPostsAuthors() {
        axios
            .get('/api/authorswithposts')
            .then(response => {
                this.setState({authors: response.data.map( author => {
                        return {
                            id: author.id,
                            fullname: author.name + " " + author.surname
                        }
                    }
                )});
            });
    }

    getPostsTags() {
        axios
            .get('/api/gettagswithposts')
            .then(response => {
                this.setState({tags: response.data});
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
            <div className={"blog-card filter-wrapper " + this.props.className } >
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
                            valueField="id"
                            textField="category"
                            onChange={value => this.props.updateCategoryFilter(value.map(value => value.id).join(","))}
                        />
                    </div>}
                    { (type !== 'user') && <div className="author-column">
                        <Multiselect
                            placeholder="Автор"
                            data={this.state.authors}
                            valueField="id"
                            textField="fullname"
                            onChange={value => this.props.updateAuthorFilter(value.map(value => value.id).join(","))}
                        />
                    </div>}
                    <div className="tag-column">
                        <Multiselect
                            placeholder="Тэг"
                            data={this.state.tags}
                            valueField="id"
                            textField="tag"
                            onChange={value => this.props.updateTagFilter(value.map(value => value.id).join(","))}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
