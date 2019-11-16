import { POST_SEARCH, COMMENT_SEARCH } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case POST_SEARCH:
      return "posts";
    case COMMENT_SEARCH:
      return "comments";
    default:
      return state;
  }
};
