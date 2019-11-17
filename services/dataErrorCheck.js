module.exports = data => {
  switch (data) {
    // first check internal server error, then check all others
    case data.error && data.error === 500:
      return {
        err: "Internal Server Error",
        msg:
          "The server couldn't handle the load. Please try again with a shorter timespan or a smaller subreddit"
      };
    case !data.data:
    case data.kind != "Listing":
    case data.error && data.error === 404:
    case data.data.dist && data.data.children[0].kind != "t3":
      return {
        err: "Bad Request",
        msg:
          "This is usually because of a typo, an invalid subreddit, or a subreddit with no posts",
        status: 400
      };
  }

  return false;
};
