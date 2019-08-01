import React, { Component } from 'react';

class Header extends Component {

    render() {
        return (
            <div className="nav">
                <div className="nav-wraper">
                    <div className="nav-logo">
                        <h3>Blog</h3>
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li className="nav-link"><a href="#">link1</a></li>
                            <li className="nav-link"><a href="#">link2</a></li>
                            <li className="nav-link"><a href="#">link3</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
