import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <Route path="/" exact component={Landing} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
