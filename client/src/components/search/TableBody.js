import "../../styles/search/TableBody.css";
import React, { Component } from "react";
import { connect } from "react-redux";

class TableBody extends Component {
  renderContent = () => {
    const { sort, karmaDesc, countDesc } = this.props;

    // data to be used will be assigned to this var
    let selectedData = [];

    // select which key of data to use
    // destructure to not mutate
    if (sort.includes("karma")) {
      selectedData.push(...karmaDesc);
    } else selectedData.push(...countDesc);

    // reverse array if 'Asc'
    if (sort.includes("Asc")) selectedData.reverse();

    // data will be sorted according to state
    return selectedData.map(({ name, score, count }, i) => {
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
        rank = selectedData.length - i;
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

// data is found in data[0] can destructure into mapStateToProps

const mapStateToProps = ({ sort, data: [{ karmaDesc, countDesc }] }) => {
  return { sort, karmaDesc, countDesc };
};

export default connect(mapStateToProps)(TableBody);
