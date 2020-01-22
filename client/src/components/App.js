import "../styles/App.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./header/Header";
import Search from "./search/Search";
import Docs from "./docs/Docs";
import CV from "./cv/CV";
import Contact from "./contact/Contact";
import Github from "./github/Github";

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
              <Route path="/cv" exact component={CV} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/github" exact component={Github} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
