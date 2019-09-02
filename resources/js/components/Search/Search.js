import React, { Component } from 'react';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchValue: '',
            searchIsEmpty: true
        };
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    onFocus(event){
        event.target.classList.add("rw-state-focus");
    }

    onBlur(event){
        event.target.classList.remove("rw-state-focus");
    }

    onChange(event){
        this.setState({searchValue: event.target.value});
        this.props.onChange(event.target.value);
        if(event.target.value){
            this.setState({searchIsEmpty: false});
        } else {
            this.setState({searchIsEmpty: true});
        }
    }

    clearSearch(){
        this.setState({searchValue: ''});
        this.setState({searchIsEmpty: true});
        this.props.onChange('');
    }

    render() {
        return (
            <div className="search-wrapper">
                <input
                    value={this.state.searchValue}
                    placeholder={this.props.placeholder}
                    className="rw-widget-input rw-widget-picker rw-widget-container search"
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    type="text"/>
                {(!this.state.searchIsEmpty) &&
                    <i
                        onClick={this.clearSearch}
                        className="fa fa-times text-link"
                        aria-hidden="true"></i>}
            </div>
        );
    }
}

export default Search;
