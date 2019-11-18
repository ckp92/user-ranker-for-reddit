import "../../styles/search/SearchResults.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleSort } from "../../actions";
import TableBody from "./TableBody";

class SearchResults extends Component {
  renderHeading = () => {
    const { currentlySearching, searchType, data } = this.props;
    if (currentlySearching) {
      // if user has pressed search & is waiting for results
      return (
        <React.Fragment>
          <h2>Fetching Results</h2>
          <h4>This can take a few minutes</h4>
          <div className="loader"></div>
        </React.Fragment>
      );
    } else {
      if (searchType && data) {
        // search has returned an error
        if (data.err) {
          return (
            <React.Fragment>
              <h2>Oops - there's nothing here!</h2>
              <h4>{data.msg}</h4>
            </React.Fragment>
          );
        }
        // search has returned empty array (some errors still make it past backend b/c of the recursive nature of the fetch posts function)
        else if (!data.length) {
          return (
            <React.Fragment>
              <h2>Oops - there's nothing here!</h2>
              <h4>
                It's usually a typo or an empty/invalid subreddit, but it could
                also be a server timeout
              </h4>
            </React.Fragment>
          );
        }
        // if data has been received successfully
        else {
          return (
            <React.Fragment>
              <h2>
                {searchType.charAt(0).toUpperCase() + searchType.slice(1)}{" "}
                Rankings
              </h2>
              <h4> Click 'Karma' or 'Count' to change the sorting</h4>
            </React.Fragment>
          );
        }
      }
    }
  };

  // will only render if we have valid data AND we are not currently searching
  // allows it to disappear while searching, if user decides to search again
  renderTable = () => {
    const { currentlySearching, searchType, data } = this.props;
    if (!currentlySearching && searchType && data && data.length) {
      return (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th className="interactive" onClick={this.toggleKarmaSort}>
                Karma {this.renderIcon("karma")}
              </th>
              <th className="interactive" onClick={this.toggleCountSort}>
                Count {this.renderIcon("count")}
              </th>
            </tr>
          </thead>
          <TableBody />
        </table>
      );
    }
  };

  // will decide whether to sort karma asc or desc
  // make default descending when switching over from count
  toggleKarmaSort = () => {
    const { sort, toggleSort } = this.props;
    if (sort.includes("count") || sort === "karmaAsc")
      return toggleSort("karmaDesc");
    return toggleSort("karmaAsc");
  };

  // will decide whether to sort count asc or desc
  // make default descending when switching over from karma
  toggleCountSort = () => {
    const { sort, toggleSort } = this.props;
    if (sort.includes("karma") || sort === "countAsc")
      return toggleSort("countDesc");
    return toggleSort("countAsc");
  };

  // state will contain name and sort type
  // we will pass the name, so if it matches, it will render it on the correct column
  renderIcon = current => {
    const { sort } = this.props;
    if (sort.includes(current)) {
      if (sort.includes("Desc")) return <i className="fas fa-sort-down"></i>;
      return <i className="fas fa-sort-up"></i>;
    }
  };

  render() {
    return (
      <div className="search-results">
        <div className="results-heading">{this.renderHeading()}</div>
        {this.renderTable()}
      </div>
    );
  }
}

const mapStateToProps = ({ currentlySearching, searchType, data, sort }) => {
  return { currentlySearching, searchType, data, sort };
};

// delete sort is not used

export default connect(mapStateToProps, { toggleSort })(SearchResults);
