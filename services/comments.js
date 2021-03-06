const fetch = require("node-fetch");
const tallyScores = require("./tallyScores");
const tokenErrorCheck = require("./tokenErrorCheck");
const dataErrorCheck = require("./dataErrorCheck");

// Reddit API will give us a list of top posts, but that list won't contain the comment data for each posts.
// We will fetch all posts, get their ids
// Build a uri for each post using it's id
// Then fetch comment data from every uri
// Then tally

module.exports = async (accessToken, subreddit, t) => {
  // Global Arrs
  const allPostIds = [];
  const untalliedScores = [];
  const talliedScores = [];

  // display status message
  console.log("Fetching Posts");

  // build Fetch options
  const headers = new Headers();
  headers.append("Authorization", `bearer ${accessToken}`);
  const options = { headers };

  // GET POSTS, EXTRACT IDs
  const getPostIds = async (after = null) => {
    // use 'after' property (provided by reddit api) to get data from the next page
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
      // send server error status code
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
    // loop through and get the postIds
    const ids = children.map(({ data: { id } }) => id);

    // destructure and add each set of 100 extracted ids to allPostIds
    allPostIds.push(...ids);

    // data.data.after = 'after' property
    after = data.data.after;

    // reddit lets us get a maximum of 1000 posts, if there are that many available
    // gives us a non-null 'after' property to inform us there are still more posts to fetch
    // gives us a 'after: null' when there's no more posts to fetch
    // recursive fn will use 'after' to keep fetching posts until reddit api says 'after: null'
    if (after) await getPostIds(after);

    // once there are no more posts to fetch, get the comments from those posts
    if (!after) await getComments(allPostIds);
  };

  // GET POST COMMENTS USING IDs
  const getComments = async postIds => {
    // display status message
    console.log("Fetching Comments From Each Post");

    // Bulk-fetch all the individual arrays, in order, and return a single array of post objects
    await Promise.all(
      postIds.map(id => {
        const uri = `https://oauth.reddit.com/r/${subreddit}/comments/${id}.json?sort=top&limit=500&depth=50`;
        return fetch(uri, options);
      })
    )
      .then(responses => {
        console.log("Converting to json");
        console.log("Memory before:", process.memoryUsage());
        let res = Promise.all(responses.map(res => res.json()));
        console.log("Memory after", process.memoryUsage());
        return res;
      })
      // post[1].data.children === array of all parent comment objects for that specific post
      .then(posts => getScores(posts))
      // .then(posts => posts.map(post => post[1].data.children))
      // commentObjectArray === array of [arrays of parent comment objects]
      // .then(commentObjectArray => getScores(commentObjectArray))
      .catch(e => {
        console.error(e);
        talliedScores.push({
          err: "Internal Server Error",
          msg:
            "The server couldn't handle the load. Please try again with a shorter timespan or a smaller subreddit"
        });
      });
  };

  // At this point, array passed into getScores will be:
  // [
  //   [ {},{},{},{},{} ],          (5 parent comments for post 0)
  //   [],                          (0 parent comments for post 1)
  //   [ {},{},{},{} ],             (4 parent comments for post 2)
  //   [ {},{},{},{},{},{},{} ]     (6 parent comments for post 3)
  // ];

  // GET SCORES FROM COMMENTS
  const getScores = parentArr => {
    // display status message
    console.log("Extracting Comment Scores And Comment-Reply Scores");
    // post[1].data.children
    parentArr.forEach(post => {
      const childArr = post[1].data.children;
      if (childArr.length) {
        childArr.forEach(commentObj =>
          getScoresRecursively(commentObj, untalliedScores)
        );
      }
    });

    // tally the scores & push to global arr
    // final format will be a array with 1 obj with 2 keyval pairs
    talliedScores.push(tallyScores(untalliedScores));
  };

  // CALL THE SERVICE
  await getPostIds();

  return talliedScores;
};

// FUNCTIONS ---------------------------------------------------------------------------------------------

// GET SCORES RECURSIVELY
const getScoresRecursively = (
  { data: { author, score, replies } },
  globalArr
) => {
  // get get the author name and comment score for a parent object and push to global arr
  globalArr.push({ author, score });

  // check if there are any comment replies on it
  if (replies) {
    // if a comment has replies, find the array of reply-objects, and run getScoresRecursively on it
    // (reply-object structure is same as comment-object structure, so we can use the same fn)
    const repliesArray = replies.data.children;
    repliesArray.forEach(replyObj => getScoresRecursively(replyObj, globalArr));
  }
};
