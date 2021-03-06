const fetch = require("node-fetch");
const tallyScores = require("./tallyScores");
const tokenErrorCheck = require("./tokenErrorCheck");
const dataErrorCheck = require("./dataErrorCheck");

global.fetch = fetch;
global.Headers = fetch.Headers;

module.exports = async (accessToken, subreddit, t) => {
  // Global Arrs
  const untalliedScores = [];
  const talliedScores = [];

  // display status message
  console.log(`Fetching Posts`);

  // build Fetch options
  const headers = new Headers();
  headers.append("Authorization", `bearer ${accessToken}`);
  const options = { headers };

  // GET POSTS, EXTRACT EACH POST'S AUTHOR AND SCORE
  const getTopPosts = async (after = null) => {
    // use 'after' property (provided by reddit api) to get data fromm the next page
    let res = null;
    let data = null;

    try {
      res = await fetch(
        `https://oauth.reddit.com/r/${subreddit}/top.json?sort=top&t=${t}&limit=100&after=${after ||
          ""}`,
        options
      );

      data = await res.json();
    } catch (e) {
      console.error(e);
      data = { error: 500 };
    }
    // ERROR CHECKING - BEARER TOKEN
    const tokenError = tokenErrorCheck(res.status);
    if (tokenError) return talliedScores.push(tokenError);

    // ERROR CHECKING - DATA RECEIVED
    const dataError = dataErrorCheck(data);
    if (dataError) return talliedScores.push(dataError);

    // data.data.children = array of post objects
    const { children } = data.data;

    // children[i].data where data we want (author/score) is
    // map over all children and extract (author/score) from all posts
    const extracted = children.map(({ data: { author, score } }) => ({
      author,
      score
    }));

    // destructure and add each set of 100 extracted posts to untalliedScores
    untalliedScores.push(...extracted);

    // data.data.after = 'after' property
    after = data.data.after;

    // reddit lets us get a maximum of 1000 posts, if there are that many available
    // gives us a non-null 'after' property to inform us there are still more posts to fetch
    // gives us a 'after: null' when there's no more posts to fetch
    // recursive fn will use 'after' to keep fetching posts until reddit api says 'after: null'
    if (after) await getTopPosts(after);

    // if 'after' has been assigned 'null', we know there are no more posts, so we tally, sort and push to global array
    // final format will be a array with 1 obj with 2 keyval pairs
    if (!after) talliedScores.push(tallyScores(untalliedScores));
  };

  // CALL THE SERVICE
  await getTopPosts();

  return talliedScores;
};
