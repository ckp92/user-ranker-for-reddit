import "../styles/ContactRequest.css";
import React from "react";
import Shell from "./Shell";
import { Link } from "react-router-dom";

const ContactRequest = ({ contentHeader, contentMain }) => {
  const renderContent = () => {
    return (
      <div className="contact-request-content">
        <p>{contentMain} available upon request</p>

        <Link to="/contact">Click here to go to the Contact page</Link>
      </div>
    );
  };

  return (
    <div className="contact-request">
      <Shell title={contentHeader}>{renderContent()}</Shell>
    </div>
  );
};

export default ContactRequest;
