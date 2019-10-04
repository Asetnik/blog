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
            prevSearch: '',
            categories: [],
            authors: [],
            tags: [],
            dateSince: '',
            dateUntil: ''
        };
        this.datepickersSpellcheck = this.datepickersSpellcheck.bind(this);
        this.localizer = this.localizer.bind(this);
    }

    componentWillMount() {
        this.localizer();
        axios.all([
            axios.get('/api/categorieswithposts'),
            axios.get('/api/authorswithposts'),
            axios.get('/api/gettagswithposts')
        ])
            .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {
                this.setState({
                    categories: firstResponse.data,
                    authors: secondResponse.data.map( author => {
                        return {
                            id: author.id,
                            fullname: author.name + " " + author.surname
                        }
                    }),
                    tags: thirdResponse.data
                });
            }));
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
                            onChange={ value => this.props.updateFilter( {dateSince: value} ) }
                        />
                    </div>
                    <div className="date-until">
                        <DateTimePicker
                            placeholder="До"
                            onChange={ value => this.props.updateFilter( {dateUntil: value} ) }
                        />
                    </div>
                    <div className="search-row">
                        <Search
                            placeholder="Поиск по названию и описанию"
                            onChange={ value => {
                                if(value !== this.state.prevSearch){
                                    this.props.updateFilter( {search: value} )
                                }
                                this.setState({prevSearch: value});
                            } }
                        />
                    </div>
                    { (type !== 'category') && <div className="category-column">
                        <Multiselect
                            placeholder="Категория"
                            data={this.state.categories}
                            valueField="id"
                            textField="category"
                            onChange={value => this.props.updateFilter( {category: value.map(value => value.id).join(",")} ) }
                        />
                    </div>}
                    { (type !== 'user') && <div className="author-column">
                        <Multiselect
                            placeholder="Автор"
                            data={this.state.authors}
                            valueField="id"
                            textField="fullname"
                            onChange={value => this.props.updateFilter( {author: value.map(value => value.id).join(",")} ) }
                        />
                    </div>}
                    <div className="tag-column">
                        <Multiselect
                            placeholder="Тэг"
                            data={this.state.tags}
                            valueField="id"
                            textField="tag"
                            onChange={value => this.props.updateFilter( {tag: value.map(value => value.id).join(",")} ) }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
