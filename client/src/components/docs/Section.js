import "../../styles/docs/Section.css";
import React, { Component } from "react";

class Section extends Component {
  renderList = () => {
    return this.props.list.map((item, i) => <li key={i}>{item}</li>);
  };
  render() {
    return (
      <div className="section">
        <h2 className="section-heading">{this.props.heading}</h2>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

export default Section;
