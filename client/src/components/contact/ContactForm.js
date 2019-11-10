import '../../styles/contact/ContactForm.css';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { activateReview } from '../../actions';
import formFields from './formFields';
import ContactField from './ContactField';
import BlueButton from '../BlueButton';

class ContactForm extends Component {
  renderFields = () => {
    // console.log(this.props);
    return formFields.map(fields => {
      return <Field {...fields} key={fields.name} component={ContactField} />;
    });
  };

  render() {
    return (
      <div className="contact-form">
        <div className="heading">
          <h1 className="title">Tell Me What You Think</h1>
        </div>
        <div className="contact-body">
          <h3>Ask a question, leave some feedback, or just say hi!</h3>
          <h3>You'll get a reply within 24 hours</h3>
          <form onSubmit={this.props.handleSubmit(this.props.activateReview)}>
            {this.renderFields()}
            <div className="submit-button">
              <BlueButton text="Next" type="submit" />
            </div>
          </form>
        </div>
        <div className="below-form">
          <h4>Alternatively you can send an email to cpatel818@gmail.com</h4>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  // from emailregex.com
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // email validation
  if (re.test(values.senderEmail) === false)
    errors.senderEmail = 'Invalid Email';

  // empty fields validation
  formFields.forEach(field => {
    if (!values[field.name]) errors[field.name] = 'Required';
  });

  return errors;
};

const connected = connect(
  null,
  { activateReview }
)(ContactForm);

export default reduxForm({
  form: 'contactForm',
  validate,
  destroyOnUnmount: false
})(connected);
// validate
// error ?
// refactor?
