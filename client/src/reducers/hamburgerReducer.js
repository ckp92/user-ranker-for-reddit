import { CLICK_HAMBURGER_MENU } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case CLICK_HAMBURGER_MENU:
      return !state;
    default:
      return state;
  }
};
