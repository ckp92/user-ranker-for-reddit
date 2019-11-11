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
        <div className="contact-heading">
          <h1 className="contact-title">Tell Me What You Think</h1>
        </div>
        <div className="contact-body">
          <h3>Ask a question, leave some feedback, or just say hi!</h3>
          <h3>You'll get a reply within 24 hours</h3>
          <form onSubmit={this.props.handleSubmit(this.props.activateReview)}>
            {this.renderFields()}
            <BlueButton text="Next" type="submit" />
          </form>
        </div>
        <div className="contact-bottom">
          <h4>
            Alternatively you can send an email to{' '}
            <a
              href="mailto:cpatel818@gmail.com?Subject=RE:%20Reddit%20User%20Ranker"
              target="_blank"
            >
              cpatel818@gmail.com
            </a>
          </h4>
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
