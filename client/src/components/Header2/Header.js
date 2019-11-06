import './Header.css';
import React, { Component } from 'react';
import { BRAND_OPTIONS, MENU_OPTIONS } from '../../utils/options';
import HeaderButton from './HeaderButton';

class Header extends Component {
  renderMenuButtons = () => {
    return MENU_OPTIONS.map(options => (
      <HeaderButton key={options.content} options={options} />
    ));
  };
  render() {
    return (
      <div className="header">
        <div className="left">
          <HeaderButton options={BRAND_OPTIONS} />
        </div>
        <div className="right">
          <div className="hamburger-button">
            <i className="fas fa-bars fa-2x" />
          </div>
          <div className="menu-buttons">{this.renderMenuButtons()}</div>
        </div>
        <div className="mobile-menu-buttons">{this.renderMenuButtons()}</div>
      </div>
    );
  }
}

export default Header;
