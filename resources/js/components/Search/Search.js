import React, { Component } from 'react';

class Search extends Component{
    constructor(props){
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus(event){
        event.target.classList.add("rw-state-focus");
    }

    onBlur(event){
        event.target.classList.remove("rw-state-focus");
    }

    render() {
        return (
            <input
                placeholder="Поиск"
                className="rw-widget-input rw-widget-picker rw-widget-container search"
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                type="text"/>
        );
    }
}

export default Search;
