import '../../styles/Header.css';
import React, { Component } from 'react';
import HeaderButton from './HeaderButton';
import { BRAND_OPTIONS, MENU_OPTIONS } from '../../utils/options';

class Header extends Component {
  renderButtons = () => {
    return MENU_OPTIONS.map(options => {
      return <HeaderButton key={options.content} options={options} />;
    });
  };

  render() {
    return (
      <div className="header">
        <div className="left">
          <HeaderButton options={BRAND_OPTIONS} />
        </div>
        <div className="right">
          <div className="hamburger-button">
            <h3>
              <i className="fas fa-bars fa-lg" />
            </h3>
          </div>
          <div className="menu-buttons-full">{this.renderButtons()}</div>
        </div>
      </div>
    );
  }
}

export default Header;
