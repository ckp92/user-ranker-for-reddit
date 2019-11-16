import "../../styles/search/SearchForm.css";
import "../../styles/search/SearchForm.css";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  startSearching,
  stopSearching,
  setTypePost,
  setTypeComment,
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

  onSubmit = (formValues, type) => {
    const {
      data,
      startSearching,
      setTypeComment,
      setTypePost,
      getCommentData,
      getPostData,
      clearResults
    } = this.props;

    console.log(type, "selected");
    console.log(formValues);

    // clear previous search results if any
    if (data) clearResults();
    // change currentlySearching state to 'true'
    startSearching();

    // fetch data according to search type 'comments' or 'posts'
    if (type === "comments") {
      setTypeComment();
      getCommentData(formValues);
    } else {
      setTypePost();
      getPostData(formValues);
    }
  };

  onSubmitPosts = formValues => this.onSubmit(formValues, "posts");

  onSubmitComments = formValues => this.onSubmit(formValues, "comments");

  render() {
    return (
      <form>
        {this.renderFields()}
        <div className="search-buttons">
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

const mapStateToProps = ({ data }) => {
  return { data };
};

const connected = connect(mapStateToProps, {
  startSearching,
  stopSearching,
  setTypePost,
  setTypeComment,
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
