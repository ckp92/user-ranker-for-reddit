import '../../styles/Header.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickHamburger } from '../../actions';
import { BRAND_OPTIONS, MENU_OPTIONS } from '../../utils/options';

import BrandButton from './BrandButton';
import MenuButton from './MenuButton';
import HeaderNotification from './HeaderNotification';
import DropdownModal from './DropdownModal';

class Header extends Component {
  // Render Desktop-Size Menu Buttons
  renderMenuButtons = () => {
    return MENU_OPTIONS.map(options => {
      return <MenuButton key={options.content} options={options} />;
    });
  };

  // Make hamburger darker when clicked
  toggleHamburgerColor = () => {
    if (this.props.hamburgerOn) return 'btn hamburger-on';
    return 'btn';
  };

  // Show dropdown menu when hamburgerOn state === true
  // ( will happen when hamburger is clicked )
  // ( only possible in mobile mode because hamburger will be hidden in desktop mode )
  renderDropdown = () => {
    if (this.props.hamburgerOn)
      return <DropdownModal onDismiss={this.closeMenu} />;
    return;
  };

  // If hamburger menu is open, close it by invoking the reducer to toggle it
  closeMenu = () => {
    if (this.props.hamburgerOn) this.props.clickHamburger();
  };

  // If hamburger menu is closed, open it by invoking the reducer to toggle it
  openMenu = () => {
    if (!this.props.hamburgerOn) this.props.clickHamburger();
  };

  // Render HeaderNotification component when headerNotificationOn state === true
  // Will be when this component initially mounts (when we load the app)
  // When user clicks the 'x' button, will change the state to 'false' and unmount this.
  // Pass in JSX as props using '{}'
  renderHeaderNotification = () => {
    if (this.props.headerNotificationOn) {
      return (
        <HeaderNotification
          mainContent={
            <React.Fragment>
              <span className="underline-span">Try Me On Your Smartphone!</span>
              &nbsp;(Chrome: Right-Click --> 'Send to your devices')
            </React.Fragment>
          }
          closeContent={<i className="fas fa-times-circle fa-xs"></i>}
        />
      );
    }
  };

  render() {
    return (
      <header className="header">
        <nav
          aria-label="top-navbar"
          className="top-bar"
          onClick={this.closeMenu}
        >
          <div className="top-left">
            {/* ====== BRAND BUTTON ====== */}
            <BrandButton options={BRAND_OPTIONS} />
          </div>
          <div className="top-right">
            {/* ====== HAMBURGER BUTTON ====== */}
            <button
              onClick={this.openMenu}
              className={this.toggleHamburgerColor()}
              id="hamburger-button"
            >
              <i className="fas fa-bars fa-2x" />
            </button>
            {/* ====== TOP MENU BUTTONS ====== */}
            <div className="top-menu-buttons">{this.renderMenuButtons()}</div>
          </div>
        </nav>
        {/* ====== HEADER NOTIFICATION ====== */}
        {this.renderHeaderNotification()}
        {/* ====== DROPDOWN MENU ====== */}
        <nav aria-label="dropdown-menu" className="dropdown-menu">
          {this.renderDropdown()}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ hamburgerOn, headerNotificationOn }) => {
  return {
    hamburgerOn,
    headerNotificationOn
  };
};

export default connect(
  mapStateToProps,
  { clickHamburger }
)(Header);
