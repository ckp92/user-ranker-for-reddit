import '../../styles/contact/ContactField.css';
import React from 'react';

const ContactField = ({
  input,
  label,
  type,
  meta: { active, error, touched }
}) => {
  const renderInput = () => {
    if (type === 'text') return <input {...input} />;
    if (type === 'textarea')
      return <textarea cols="30" rows="10" {...input}></textarea>;
  };
  return (
    <div className="contact-field">
      <label>{label}</label>
      {renderInput()}
      <div className="error">{touched && error && !active ? error : ''}</div>
    </div>
  );
};

export default ContactField;
