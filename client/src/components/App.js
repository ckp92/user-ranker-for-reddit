import "../styles/App.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./header/Header";
import Search from "./search/Search";
import Docs from "./docs/Docs";
import Contact from "./contact/Contact";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route path="/" exact component={Search} />
              <Route path="/docs" exact component={Docs} />
              <Route path="/contact" exact component={Contact} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
