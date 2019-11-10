import { ACTIVATE_REVIEW, DEACTIVATE_REVIEW } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case ACTIVATE_REVIEW:
      return true;
    case DEACTIVATE_REVIEW:
      return false;
    default:
      return state;
  }
};
