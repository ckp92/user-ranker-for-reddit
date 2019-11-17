import "../../styles/contact/ContactForm.css";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { toggleReview } from "../../actions";
import formFields from "./formFields";
import FormField from "../FormField";
import BlueButton from "../BlueButton";

class ContactForm extends Component {
  onSubmit = () => {
    this.props.toggleReview(true);
  };

  renderFields = () => {
    return formFields.map(fields => {
      return <Field {...fields} key={fields.name} component={FormField} />;
    });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {this.renderFields()}
        <BlueButton text="Next" type="submit" />
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  // from emailregex.com
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // email validation
  if (re.test(values.senderEmail) === false)
    errors.senderEmail = "Invalid Email";

  // empty fields validation
  formFields.forEach(field => {
    if (!values[field.name]) errors[field.name] = "Required";
  });

  return errors;
};

const connected = connect(null, { toggleReview })(ContactForm);

export default reduxForm({
  form: "contactForm",
  validate,
  destroyOnUnmount: false
})(connected);
