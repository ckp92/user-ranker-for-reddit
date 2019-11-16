import {
  CLICK_HAMBURGER,
  CLOSE_HEADER_NOTIFICATION,
  ACTIVATE_REVIEW,
  DEACTIVATE_REVIEW,
  SEND_EMAIL,
  CLOSE_MODAL,
  START_SEARCHING,
  STOP_SEARCHING,
  POST_SEARCH,
  COMMENT_SEARCH,
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

// activate preview mode
export const activateReview = () => {
  return { type: ACTIVATE_REVIEW };
};

// deactivate preview mode
export const deactivateReview = () => {
  return { type: DEACTIVATE_REVIEW };
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

// set currentlySearching to true
export const startSearching = () => {
  return { type: START_SEARCHING };
};

// set currentlySearching to false
export const stopSearching = () => {
  return { type: STOP_SEARCHING };
};

// set searchType to posts
export const setTypePost = () => {
  return { type: POST_SEARCH };
};

// set searchType to comments
export const setTypeComment = () => {
  return { type: COMMENT_SEARCH };
};

// get post data
export const getPostData = values => async dispatch => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(values)
  };

  const res = await fetch("/api/search/posts", options).catch(e =>
    console.error(e)
  );
  const data = await res.json().catch(e => console.error(e));

  dispatch({ type: GET_POST_DATA, payload: data });
};

// get comment data
export const getCommentData = values => async dispatch => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(values)
  };

  const res = await fetch("/api/search/comments", options).catch(e =>
    console.error(e)
  );
  const data = await res.json().catch(e => console.error(e));

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
