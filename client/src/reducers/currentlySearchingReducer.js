import {
  SET_CURRENTLY_SEARCHING,
  GET_POST_DATA,
  GET_COMMENT_DATA
} from "../actions/types";

// getcomment/postdata actions will be sent once the response has been received. At this point we are no longer searching. So we can use them to change the state to false

export default (state = false, action) => {
  switch (action.type) {
    case SET_CURRENTLY_SEARCHING:
      return action.payload;
    case GET_COMMENT_DATA:
    case GET_POST_DATA:
      return false;
    default:
      return state;
  }
};
