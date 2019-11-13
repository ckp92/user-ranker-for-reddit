module.exports = status => {
  if (status === 401) {
    return {
      err: "Unauthorized",
      msg: "Server error. Please try again later.",
      status: 401
    };
  }

  return false;
};
