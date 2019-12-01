import "../../styles/contact/Contact.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { toggleReview } from "../../actions";
import Shell from "../Shell";
import ContactForm from "./ContactForm";
import ContactFormReview from "./ContactFormReview";

class Contact extends Component {
  // without this: if ContactFormReview.js is mounted, then user navigates elsewhere. When they go BACK to /contact, the state for 'reviewOn' will still be true. So react will try mount 'ContactFormReview.js' but it won't have the formValues needed for its mapStateToProps.
  componentWillUnmount = () => this.props.toggleReview(false);
  renderContent = () => {
    if (this.props.reviewOn) {
      return (
        <Shell title="Review and Send">
          <div className="inner-content">
            <h3>Does everything look OK?</h3>
            <ContactFormReview />
          </div>
        </Shell>
      );
    } else {
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
              href="mailto:cpatel818@gmail.com?Subject=RE:%20User%20Ranker%20For%20Reddit"
              target="_blank"
              rel="noopener noreferrer"
            >
              cpatel818@gmail.com
            </a>
          </React.Fragment>
        </Shell>
      );
    }
  };

  render() {
    return <div className="contact">{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => {
  return { reviewOn: state.reviewOn };
};

const connected = connect(mapStateToProps, { toggleReview })(Contact);

export default reduxForm({ form: "contactForm" })(connected);
