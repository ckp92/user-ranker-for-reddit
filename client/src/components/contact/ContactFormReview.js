import "../../styles/contact/ContactFormReview.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deactivateReview, sendEmail } from "../../actions";
import formFields from "./formFields";
import BlueButton from "../BlueButton";

class ContactFormReview extends Component {
  // for the message, create new p element for each linebreak
  // just for this review component. it won't change actual formValues.
  // when email is sent it will appear just the way the user wrote it.
  formatFormValues = name => {
    const { formValues } = this.props;
    if (name === "body") {
      return formValues.body.split("\n").map((line, i) => {
        return <p key={i}>{line}</p>;
      });
    } else {
      return <p>{formValues[name]}</p>;
    }
  };

  // render the preview for each form field
  renderReview = () => {
    return formFields.map(({ name, label }) => {
      return (
        <div key={name} className={`review-field ${name}`}>
          <h4>{label}</h4>
          {this.formatFormValues(name)}
        </div>
      );
    });
  };

  render() {
    return (
      <div className="review-body">
        <div className="review-fields">{this.renderReview()}</div>
        <div className="review-buttons">
          <BlueButton text="Back" onClick={this.props.deactivateReview} />
          <BlueButton
            text="Send"
            onClick={() =>
              this.props.sendEmail(this.props.formValues, this.props.history)
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { formValues: state.form.contactForm.values };
};

export default connect(mapStateToProps, { deactivateReview, sendEmail })(
  withRouter(ContactFormReview)
);

// contactFormReview doesn't know about react-router-dom, so it's difficult to redirect to homepage
// so we use withRouter
// then we can pass this.props.history to the action creator
