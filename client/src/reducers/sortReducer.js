import { TOGGLE_SORT } from "../actions/types";

export default (state = "karmaDesc", action) => {
  switch (action.type) {
    case TOGGLE_SORT:
      return action.payload;
    default:
      return state;
  }
};
