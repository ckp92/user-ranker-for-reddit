import "../../styles/search/SearchForm.css";
import "../../styles/search/SearchForm.css";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  setCurrentlySearching,
  setSearchType,
  getPostData,
  getCommentData,
  clearResults
} from "../../actions";
import searchFields from "./searchFields";
import FormField from "../FormField";
import BlueButton from "../BlueButton";

class SearchForm extends Component {
  renderFields = () => {
    return searchFields.map(fields => {
      return <Field {...fields} key={fields.name} component={FormField} />;
    });
  };

  // will block out search buttons when currently searching for some results
  renderClassName = () => {
    const { currentlySearching } = this.props;
    if (currentlySearching) return "search-buttons currently-searching";
    return "search-buttons";
  };

  onSubmitPosts = formValues => this.onSubmit(formValues, "posts");

  onSubmitComments = formValues => this.onSubmit(formValues, "comments");

  onSubmit = (formValues, type) => {
    const {
      currentlySearching,
      data,
      setCurrentlySearching,
      setSearchType,
      getCommentData,
      getPostData,
      clearResults
    } = this.props;

    // don't search again if we are currently searching
    if (currentlySearching) return;

    console.log(type, "selected");
    console.log(formValues);

    // clear previous search results if any
    if (data) clearResults();
    // change currentlySearching state to 'true'
    setCurrentlySearching(true);

    // set search type state
    setSearchType(type);

    // fetch data according to search type 'comments' or 'posts'
    if (type === "comments") {
      getCommentData(formValues);
    } else {
      getPostData(formValues);
    }
  };

  render() {
    return (
      <form>
        {this.renderFields()}
        <div className={this.renderClassName()}>
          <BlueButton
            onClick={this.props.handleSubmit(this.onSubmitPosts)}
            type="submit"
            text="Posts"
          />
          <BlueButton
            onClick={this.props.handleSubmit(this.onSubmitComments)}
            type="submit"
            text="Comments"
          />
        </div>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.subreddit) errors.subreddit = "Required";

  return errors;
};

const warn = formValues => {
  const warnings = {};
  if (formValues.t === "year" || formValues.t === "all")
    warnings.t =
      "WARNING: Large timespans on very active subreddits may cause the server to timeout due to large volumes of data";

  return warnings;
};

const mapStateToProps = ({ currentlySearching, data }) => {
  return { currentlySearching, data };
};

const connected = connect(mapStateToProps, {
  setCurrentlySearching,
  setSearchType,
  getPostData,
  getCommentData,
  clearResults
})(SearchForm);

export default reduxForm({
  form: "searchForm",
  initialValues: { t: "week" },
  validate,
  warn
})(connected);
