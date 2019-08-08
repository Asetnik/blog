import React, { Component } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Search from "../Search/Search";

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
    }

    componentWillMount() {
        this.localizer();
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
                        <div className="date-column">
                            <div name="date" className="datepicker-wrapper">
                                <DateTimePicker
                                    placeholder="От"
                                />
                                <DateTimePicker
                                    placeholder="До"
                                />
                            </div>
                        </div>
                        { (type !== 'category') && <div className="category-column">
                            <Multiselect
                                placeholder="Категория"
                                data={['Авто', 'Спорт', 'Природа']}
                            />
                        </div>}
                        <div className="author-column">
                            <Multiselect
                                placeholder="Автор"
                                data={['Автор 1', 'Автор 2', 'Автор 3']}
                            />
                        </div>
                        <div className="tag-column">
                            <Multiselect
                                placeholder="Тэг"
                                data={['Тэг 1', 'Тэг 2', 'Тэг 3']}
                            />
                        </div>
                        <div className="search-row">
                            <Search />
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
