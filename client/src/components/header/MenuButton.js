import "../../styles/MenuButton.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuButton extends Component {
  renderContent = () => {
    const { type, path, icon, content } = this.props.options;

    if (type === "link") {
      return (
        <Link className="btn menu-button" to={path}>
          <i className={icon} />
          <h3 className="menu-button-content">{content}</h3>
        </Link>
      );
    }

    if (type === "a") {
      return (
        <a
          className="btn menu-button"
          href={path}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={icon} />
          <h3 className="menu-button-content">{content}</h3>
        </a>
      );
    }
  };
  render() {
    return this.renderContent();
  }
}

export default MenuButton;
