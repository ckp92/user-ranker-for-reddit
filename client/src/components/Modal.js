import '../styles/Modal.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BlueButton from './BlueButton';

class Modal extends Component {
  render() {
    const { title, message, onDismiss } = this.props;
    return ReactDOM.createPortal(
      <div className="modal" onClick={onDismiss}>
        <div className="modal-inner" onClick={e => e.stopPropagation()}>
          <h3>{title}</h3>
          <p>{message}</p>
          <BlueButton text="OK" onClick={onDismiss} />
        </div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

export default Modal;
