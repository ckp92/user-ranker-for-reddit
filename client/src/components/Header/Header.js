import '../../styles/Header.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleHamburgerMenu } from '../../actions';
import { BRAND_OPTIONS, MENU_OPTIONS } from '../../utils/options';
import HeaderButton from './HeaderButton';

class Header extends Component {
  renderMenuButtons = () => {
    return MENU_OPTIONS.map(options => (
      <HeaderButton key={options.content} options={options} />
    ));
  };

  // when hamburger is clicked, open and close dropdown menu
  toggleMobileMenuClass = () => {
    if (this.props.hamburgerOn) return 'mobile-menu-buttons';
    return 'mobile-menu-buttons mobile-menu-closed';
  };

  // when dropdown menu is open, change color of hamburger button to match the dropdown color
  toggleHamburgerMenuClass = () => {
    if (this.props.hamburgerOn) return 'hamburger-button hamburger-open';
    return 'hamburger-button';
  };

  openDropdownIfClosed = () => {
    if (this.props.hamburgerOn) return;
    this.props.toggleHamburgerMenu();
  };

  closeDropdownIfOpen = () => {
    if (!this.props.hamburgerOn) return;
    this.props.toggleHamburgerMenu();
  };

  render() {
    console.log(this.props);
    return (
      <div
        className="header-container"
        // if anywhere in the header is clicked while dropdown is open, dropdown will close
        onClick={this.closeDropdownIfOpen}
      >
        {/* top bar */}
        <div className="header-top">
          <div className="left">
            {/* HEADER BUTTON */}
            <HeaderButton options={BRAND_OPTIONS} />
          </div>
          <div className="right">
            {/* HAMBURGER BUTTON */}
            <div
              // when hamburger is clicked: if dropdown is closed, invoke function to open dropdown
              // click-handler on 'header-container' div will ensure it closes when clicked when open.
              onClick={this.openDropdownIfClosed}
              className={this.toggleHamburgerMenuClass()}
            >
              <i className="fas fa-bars fa-2x" />
            </div>
            {/* DESKTOP MENU BUTTONS */}
            <div className="menu-buttons">{this.renderMenuButtons()}</div>
          </div>
        </div>
        {/* DROPDOWN BUTTONS */}
        <div className={this.toggleMobileMenuClass()}>
          {this.renderMenuButtons()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ hamburgerOn }) => {
  return { hamburgerOn };
};

export default connect(
  mapStateToProps,
  { toggleHamburgerMenu }
)(Header);
