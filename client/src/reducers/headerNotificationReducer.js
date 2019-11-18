import { CLOSE_HEADER_NOTIFICATION } from "../actions/types";

export default (state = true, action) => {
  switch (action.type) {
    case CLOSE_HEADER_NOTIFICATION:
      return false;
    default:
      return state;
  }
};
