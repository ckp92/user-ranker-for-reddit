import '../styles/App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// import Header from './Header/Header';
import Header from './Header2/Header';
import Landing from './Landing';
const Docs = () => <h1>Docs</h1>;
const Contact = () => <h1>Contact!</h1>;

const App = () => {
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
};

export default App;
