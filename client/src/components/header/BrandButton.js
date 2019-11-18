import "../../styles/header/BrandButton.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class BrandButton extends Component {
  renderContent = () => {
    const { path, icon, content } = this.props.options;
    return (
      <Link className="btn" id="brand-button" to={path}>
        <i className={icon} />
        <h3 className="brand-button-content">{content}</h3>
      </Link>
    );
  };
  render() {
    return this.renderContent();
  }
}

export default BrandButton;
