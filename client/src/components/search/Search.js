import "../../styles/search/Search.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { stopSearching } from "../../actions";
import Shell from "../Shell";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

class Search extends Component {
  componentWillUnmount = () => {
    this.props.stopSearching();
  };

  renderResults = () => {
    if (this.props.searchType) return <SearchResults />;
  };

  renderFooter = () => {
    if (!this.props.searchType) {
      return (
        <React.Fragment>
          * Please ensure you enter a valid subreddit. If you are unsure,{" "}
          <a
            href="https://www.reddit.com/subreddits"
            target="_blank"
            rel="noopener noreferrer"
          >
            check on Reddit
          </a>
          . For more info see <Link to="/docs">Docs</Link>.
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div className="search">
        <Shell title="Search Page!">
          <div className="inner-content">
            <h3>
              See which Redditors have the most karma in a given subreddit*
            </h3>
            <h3> Choose between Post and Comment data</h3>
            <SearchForm />
            {this.renderResults()}
          </div>
          {this.renderFooter()}
        </Shell>
      </div>
    );
  }
}

const mapStateToProps = ({ searchType }) => {
  return { searchType };
};

export default connect(mapStateToProps, { stopSearching })(Search);
