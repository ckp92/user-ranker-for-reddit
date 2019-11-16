import "../styles/Shell.css";
import React, { Component } from "react";

class Shell extends Component {
  // If just one child, children will be an object, but if there are more, it will become an array
  // Shell will ALWAYS have a body, but maybe not a footer, so body will be either 'children' or 'children[0]'.

  // If children is an array , render 1st element for the body, otherwise render children
  renderBody = () => {
    const { children } = this.props;
    if (children.length) return children[0];
    return children;
  };

  // If children is array, render second element as footer
  renderFooter = () => {
    const { children } = this.props;
    if (children.length) return children[1];
  };

  render() {
    return (
      <div className="shell">
        <div className="shell-heading">
          <h1 className="shell-title">{this.props.title}</h1>
        </div>
        <div className="shell-body">{this.renderBody()}</div>
        <div className="-shell-bottom">
          <h4 className="shell-footer">{this.renderFooter()}</h4>
        </div>
      </div>
    );
  }
}

export default Shell;
