import React, { Component } from 'react';

class Spinner extends Component {

    render() {
        return (
            <div className="spinner">
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default Spinner;
