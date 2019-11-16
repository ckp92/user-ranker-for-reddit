import {
  START_SEARCHING,
  STOP_SEARCHING,
  GET_POST_DATA,
  GET_COMMENT_DATA
} from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case START_SEARCHING:
      return true;
    case STOP_SEARCHING:
    case GET_COMMENT_DATA:
    case GET_POST_DATA:
      return false;
    default:
      return state;
  }
};
