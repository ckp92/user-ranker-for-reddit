import "../../styles/header/HeaderNotification.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { closeHeaderNotification } from "../../actions";

class HeaderNotification extends Component {
  render() {
    const { mainContent, closeContent } = this.props;
    return (
      <div className="header-notification">
        <div className="main-content">{mainContent}</div>
        <button onClick={this.props.closeHeaderNotification} className="close">
          {closeContent}
        </button>
      </div>
    );
  }
}

export default connect(null, { closeHeaderNotification })(HeaderNotification);

// when 'x' button is clicked, will call closeHeaderNotification to change state of 'headerNotificationOn' to false, which will cause it to unmount.
