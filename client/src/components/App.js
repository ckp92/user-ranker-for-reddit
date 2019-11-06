import '../styles/App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header/Header';
import Landing from './Landing';
const Docs = () => <h1>Docs</h1>;
const Contact = () => <h1>Contact!</h1>;

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route path="/" exact component={Landing} />
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
