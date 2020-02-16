import {
  CLICK_HAMBURGER,
  CLOSE_HEADER_NOTIFICATION,
  TOGGLE_REVIEW,
  SEND_EMAIL,
  CLOSE_MODAL,
  SET_CURRENTLY_SEARCHING,
  SET_SEARCH_TYPE,
  GET_POST_DATA,
  GET_COMMENT_DATA,
  CLEAR_RESULTS,
  TOGGLE_SORT
} from "./types";

// toggle hamburger on/off
export const clickHamburger = () => {
  return { type: CLICK_HAMBURGER };
};

// close header notif
export const closeHeaderNotification = () => {
  return { type: CLOSE_HEADER_NOTIFICATION };
};

// toggle review mode
export const toggleReview = value => {
  return { type: TOGGLE_REVIEW, payload: value };
};

// send contact email (will activate modal)
export const sendEmail = (values, history) => async dispatch => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(values)
  };

  const res = await fetch("/api/contact", options);
  const data = await res.json();

  history.push("/");

  // if there was an error, there'll be a data.error property, otherwise data will just be {}
  const payload = data.error ? "error" : "success";

  dispatch({ type: SEND_EMAIL, payload });
};

// close modal
export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

// set currentlySearching according to argument
export const setCurrentlySearching = value => {
  return { type: SET_CURRENTLY_SEARCHING, payload: value };
};

// set searchType according to argument
export const setSearchType = type => {
  return { type: SET_SEARCH_TYPE, payload: type };
};

// get post data
export const getPostData = values => async dispatch => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(values)
  };

  let data = null;

  try {
    const res = await fetch("/api/search/posts", options).catch(e =>
      console.error(e)
    );
    data = await res.json().catch(e => console.error(e));
  } catch (e) {
    console.error(e);
    data = {
      err: "Internal Server Error",
      msg:
        "The server ran out of memory. Please try again with a shorter timespan or a smaller/less active subreddit"
    };
  }

  dispatch({ type: GET_POST_DATA, payload: data });
};

// get comment data
export const getCommentData = values => async dispatch => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(values)
  };

  let data = null;

  try {
    const res = await fetch("/api/search/comments", options);
    data = await res.json();
  } catch (e) {
    console.error(e);
    data = {
      err: "Internal Server Error",
      msg:
        "The server ran out of memory. Please try again with a shorter timespan or a smaller/less active subreddit"
    };
  }

  dispatch({ type: GET_COMMENT_DATA, payload: data });
};

// clear data
export const clearResults = () => {
  return { type: CLEAR_RESULTS, payload: null };
};

// toggle sort
export const toggleSort = option => {
  return { type: TOGGLE_SORT, payload: option };
};
