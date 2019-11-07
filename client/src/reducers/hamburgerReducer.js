import { CLICK_HAMBURGER } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case CLICK_HAMBURGER:
      return !state;
    default:
      return state;
  }
};
