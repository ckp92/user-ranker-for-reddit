module.exports = data => {
  if (
    !data.data ||
    data.kind != "Listing" ||
    (data.error && data.error === 404) ||
    (data.data.dist && data.data.children[0].kind != "t3")
  ) {
    return {
      err: "Bad Request",
      msg:
        "This is usually because of a typo, an invalid subreddit, or a subreddit with no posts",
      status: 400
    };
  }

  return false;
};
