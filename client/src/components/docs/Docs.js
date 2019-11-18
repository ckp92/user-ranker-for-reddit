import "../../styles/docs/Docs.css";
import React, { Component } from "react";
import content from "./content";
import Shell from "../Shell";
import Section from "./Section";

class Docs extends Component {
  renderSections = () => {
    return content.map(({ heading, list }) => (
      <Section key={heading} heading={heading} list={list} />
    ));
  };
  render() {
    return (
      <div className="docs">
        <Shell title="Docs">
          <div className="inner-content">{this.renderSections()}</div>
        </Shell>
      </div>
    );
  }
}

export default Docs;
