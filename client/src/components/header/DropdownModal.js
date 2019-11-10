import '../../styles/DropdownModal.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MENU_OPTIONS } from './options';
import MenuButton from './MenuButton';

class Modal extends Component {
  renderContent = () => {
    return MENU_OPTIONS.map(options => {
      return <MenuButton key={options.content} options={options} />;
    });
  };
  render() {
    return ReactDOM.createPortal(
      <div onClick={this.props.onDismiss} className="dropdown-modal">
        <div className="dropdown-modal-buttons">{this.renderContent()}</div>
      </div>,
      document.querySelector('#modal')
    );
  }
}

export default Modal;
