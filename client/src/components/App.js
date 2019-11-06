import '../styles/App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header/Header';
import Landing from './Landing';
const Contact = () => <h1>Contact!</h1>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <Route path="/" exact component={Landing} />
            <Route path="/contact" exact component={Contact} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
