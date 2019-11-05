import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Landing = () => <h1>Landing!</h1>;

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Landing} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
