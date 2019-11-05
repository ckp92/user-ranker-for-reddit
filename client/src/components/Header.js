import './Header.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/" className="brand-name">
          <h2 className="brand-name-full">Reddit User Ranker</h2>
          <h2 className="brand-name-condensed">RUR</h2>
        </Link>
      </div>
    );
  }
}

export default Header;
