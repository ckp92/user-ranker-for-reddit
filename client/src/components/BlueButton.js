import '../styles/BlueButton.css';
import React from 'react';

const BlueButton = ({ text, onClick, type }) => {
  return (
    <button type={type} className="blue-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default BlueButton;
