import {
  GET_POST_DATA,
  GET_COMMENT_DATA,
  CLEAR_RESULTS
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_POST_DATA:
    case GET_COMMENT_DATA:
    case CLEAR_RESULTS:
      return action.payload;
    default:
      return state;
  }
};
