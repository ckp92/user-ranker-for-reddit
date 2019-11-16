import "../../styles/search/TableBody.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import sortData from "../../utils/sortData";

class TableBody extends Component {
  renderContent = () => {
    const { sort, data } = this.props;
    // data will be sorted according to state
    return sortData(data, sort).map(({ name, score, count }, i) => {
      let className = "";
      let rank = "";

      // classNames - highlight '[deleted]' and make evens white
      if (name === "[deleted]") {
        className = "highlight";
      } else {
        if (i % 2 === 0) className = "white";
      }

      // rank - if descending, use i+1, otherwise reverse it
      if (sort.includes("Desc")) {
        rank = i + 1;
      } else {
        rank = data.length - i;
      }
      return (
        <tr className={className} key={name}>
          <th>{rank}</th>
          <th>{name}</th>
          <th>{score}</th>
          <th>{count}</th>
        </tr>
      );
    });
  };

  render() {
    return <tbody>{this.renderContent()}</tbody>;
  }
}

const mapStateToProps = ({ sort, data }) => {
  return { sort, data };
};

export default connect(mapStateToProps)(TableBody);
