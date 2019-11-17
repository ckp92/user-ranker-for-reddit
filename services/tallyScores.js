const sortData = require("../services/sortData");

module.exports = scoresList => {
  // display status msg
  console.log("Tallying up the data");

  // tally the scores
  const talliedScores = scoresList.reduce((total, { author, score }) => {
    if (!score) return total; // remove unuseable data
    if (!total[author]) {
      total[author] = { score, count: 1 };
    } else {
      total[author].score += score;
      total[author].count += 1;
    }
    return total;
  }, {});

  // extract keys and values into separate arrays
  const keys = Object.keys(talliedScores);
  const values = Object.values(talliedScores);

  // turn single object into array of objects
  const talliedScoresArray = keys.map((author, i) => {
    return { name: author, ...values[i] };
  });

  // if no data
  if (!talliedScoresArray.length) {
    return {
      err: "Bad Request",
      msg:
        "This is usually because of a typo, an invalid subreddit, or a subreddit with no posts",
      status: 400
    };
  }

  const dataObj = {};

  // will sort data and return 500 results
  dataObj.karmaDesc = sortData(talliedScoresArray, "karmaDesc").slice(0, 500);
  dataObj.countDesc = sortData(talliedScoresArray, "countDesc").slice(0, 500);

  return dataObj;
};
