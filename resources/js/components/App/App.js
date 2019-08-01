import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

import Header from "../Header/Header";
import PageContent from "../PageContent/PageContent";
import Sidebar from "../Sidebar/Sidebar";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <div className="container page">
                    <PageContent />
                    <Sidebar />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
