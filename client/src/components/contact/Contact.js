import "../../styles/contact/Contact.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { deactivateReview } from "../../actions";
import Shell from "../Shell";
import ContactForm from "./ContactForm";
import ContactFormReview from "./ContactFormReview";

class Contact extends Component {
  // without this: if ContactFormReview.js is mounted, then user navigates elsewhere. When they go BACK to /contact, the state for 'reviewOn' will still be true. So react will try mount 'ContactFormReview.js' but it won't have the formValues needed for its mapStateToProps.
  componentWillUnmount = () => this.props.deactivateReview();
  renderContent = () => {
    if (this.props.reviewOn)
      return (
        <Shell title="Review and Send">
          <div className="inner-content">
            <h3>Does everything look OK?</h3>
            <ContactFormReview />
          </div>
        </Shell>
      );
    return (
      <Shell title="Tell Me What You Think">
        <div className="inner-content">
          <h3>Ask a question, leave some feedback, or just say hi!</h3>
          <h3>You'll get a reply within 24 hours</h3>
          <ContactForm />
        </div>
        <React.Fragment>
          Alternatively you can send an email to{" "}
          <a
            href="mailto:cpatel818@gmail.com?Subject=RE:%20User%20Ranker%20For%Reddit"
            target="_blank"
            rel="noopener noreferrer"
          >
            cpatel818@gmail.com
          </a>
        </React.Fragment>
      </Shell>
    );
  };

  render() {
    return <div className="contact">{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => {
  return { reviewOn: state.reviewOn };
};

const connected = connect(mapStateToProps, { deactivateReview })(Contact);

export default reduxForm({ form: "contactForm" })(connected);

// h1 - What do you think?
// Send a message here to ask a question, leave some feedback, or just to say 'hi'.
// I'll get back to you within 24 hours.
