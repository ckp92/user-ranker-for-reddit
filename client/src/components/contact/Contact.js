import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { deactivateReview } from '../../actions';
import ContactForm from './ContactForm';
import ContactFormReview from './ContactFormReview';

class Contact extends Component {
  // without this: if ContactFormReview.js is mounted, then user navigates elsewhere. When they go BACK to /contact, the state for 'reviewOn' will still be true. So react will try mount 'ContactFormReview.js' but it won't have the formValues needed for its mapStateToProps.
  componentWillUnmount = () => this.props.deactivateReview();
  renderContent = () => {
    if (this.props.reviewOn) return <ContactFormReview />;
    return <ContactForm />;
  };

  render() {
    return <div className="contact">{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => {
  return { reviewOn: state.reviewOn };
};

const connected = connect(
  mapStateToProps,
  { deactivateReview }
)(Contact);

export default reduxForm({ form: 'contactForm' })(connected);

// h1 - What do you think?
// Send a message here to ask a question, leave some feedback, or just to say 'hi'.
// I'll get back to you within 24 hours.
