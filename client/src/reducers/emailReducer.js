import { SEND_EMAIL, CLOSE_MODAL } from '../actions/types';

// user will get a modal stating whether or not it was successful

export default (state = null, action) => {
  switch (action.type) {
    case SEND_EMAIL:
      return action.payload;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};
