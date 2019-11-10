import {
  CLICK_HAMBURGER,
  CLOSE_HEADER_NOTIFICATION,
  ACTIVATE_REVIEW,
  DEACTIVATE_REVIEW,
  SEND_EMAIL,
  CLOSE_MODAL
} from './types';
import axios from 'axios';

// toggle hamburger on/off
export const clickHamburger = () => {
  return { type: CLICK_HAMBURGER };
};

// close header notif
export const closeHeaderNotification = () => {
  return { type: CLOSE_HEADER_NOTIFICATION };
};

// activate preview mode
export const activateReview = () => {
  return { type: ACTIVATE_REVIEW };
};

// deactivate preview mode
export const deactivateReview = () => {
  return { type: DEACTIVATE_REVIEW };
};

// send contact email (will activate modal)
export const sendEmail = (values, history) => async dispatch => {
  const res = await axios
    .post('/api/contact', values)
    .catch(e => console.error(e));

  history.push('/');

  const payload = res ? 'success' : 'error';

  dispatch({ type: SEND_EMAIL, payload });
};

// close modal
export const closeModal = () => {
  return { type: CLOSE_MODAL };
};
