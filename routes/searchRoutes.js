const getPostData = require("../services/posts");
const getCommentData = require("../services/comments");
const getBearerToken = require("../services/getBearerToken");

// OAUTH
let accessToken = null;
let issuedAt = null;
const expiresIn = 3300000;

module.exports = app => {
  // GET POST DATA RROUTE
  app.get("/api/search/posts", async (req, res) => {
    // get new token if it has been longer than 55 mins since the last one was issued
    if (Date.now() - issuedAt >= expiresIn) {
      const newToken = await getBearerToken();
      accessToken = newToken.accessToken;
      issuedAt = newToken.issuedAt;
    }

    // get the data
    const { subreddit, t } = req.body;
    const data = await getPostData(accessToken, subreddit, t).catch(e => {
      console.error(e);
      res.status(400).send({ err: "Error", msg: "Please try again" });
    });

    // check for errors which may have slipped past '.catch()'
    // look in 'data' (array) for an obj which has key: 'err'
    const errorMessage = data.filter(obj => obj.err);
    if (errorMessage.length) {
      const { err, msg, status } = errorMessage[0];
      console.log(err, msg);
      res.status(status).send({ err, msg });
      return;
    }

    // display status message
    console.log("Sending response");

    res.json(data);
  });

  // GET COMMENT DATA ROUTE
  app.get("/api/search/comments", async (req, res) => {
    // get new token if it has been longer than 55 mins since the last one was issued
    if (Date.now() - issuedAt >= expiresIn) {
      const newToken = await getBearerToken();
      accessToken = newToken.accessToken;
      issuedAt = newToken.issuedAt;
    }

    // get the data
    const { subreddit, t } = req.body;
    const data = await getCommentData(accessToken, subreddit, t).catch(e => {
      console.error(e);
      res.status(400).send({ err: "Error", msg: "Please try again" });
    });

    // check for errors which may have slipped past '.catch()'
    // look in 'data' (array) for an obj which has key: 'err'
    const errorMessage = data.filter(obj => obj.err);
    if (errorMessage.length) {
      const { err, msg, status } = errorMessage[0];
      console.log(err, msg);
      res.status(status).send({ err, msg });
      return;
    }

    // display status message
    console.log("Sending response");

    res.json(data);
  });
};
