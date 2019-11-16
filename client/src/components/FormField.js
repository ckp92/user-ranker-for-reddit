import "../styles/FormField.css";
import React from "react";

const FormField = ({
  input,
  label,
  type,
  meta: { active, error, touched, warning }
}) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return <textarea cols="30" rows="10" {...input}></textarea>;
      case "select":
        return (
          <select {...input}>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="all">All</option>
          </select>
        );
      default:
        return <input {...input} />;
    }
  };
  return (
    <div className="form-field">
      <label>{label}</label>
      {renderInput()}
      <div className="form-error">
        {touched && error && !active ? error : ""}
      </div>
      <div className="form-warning">{warning ? warning : ""}</div>
    </div>
  );
};

export default FormField;
