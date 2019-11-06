import '../../styles/HeaderButton.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderButton extends Component {
  renderContent = () => {
    const { type, path, icon, content } = this.props.options;
    if (type === 'link') {
      return (
        <Link to={path} className="header-button">
          <i className={icon} />
          <h3 className="button-content">{content}</h3>
        </Link>
      );
    } else if (type === 'a') {
      return (
        <a href={path} target="blank" className="header-button">
          <i className={icon} />
          <h3 className="button-content">{content}</h3>
        </a>
      );
    } else {
      return;
    }
  };

  render() {
    return this.renderContent();
  }
}

export default HeaderButton;
