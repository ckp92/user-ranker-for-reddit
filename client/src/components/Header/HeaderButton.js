import '../../styles/HeaderButton.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderButton extends Component {
  // renders link/anchor depending on props
  renderContent = () => {
    const { type, path, icon, content } = this.props.options;
    if (type === 'link') {
      return (
        <Link to={path} className="button-link">
          <i className={icon} />
          <h3 className="link-content">{content}</h3>
        </Link>
      );
    } else {
      return (
        <a href={path} target="blank" className="button-link">
          <i className={icon} />
          <h3 className="link-content">{content}</h3>
        </a>
      );
    }
  };

  render() {
    console.log(this.props);
    return <div className="header-button">{this.renderContent()}</div>;
  }
}

export default HeaderButton;
