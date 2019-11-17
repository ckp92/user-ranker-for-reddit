const sortDataLogic = (arr, key, option) => {
  const temp = [...arr];
  if (option === "ASC") return temp.sort((a, b) => a[key] - b[key]);
  return temp.sort((a, b) => b[key] - a[key]);
};

module.exports = (data, sort) => {
  switch (sort) {
    case "karmaAsc":
      return sortDataLogic(data, "score", "ASC");
    case "karmaDesc":
      return sortDataLogic(data, "score", "DESC");
    case "countAsc":
      return sortDataLogic(data, "count", "ASC");
    default:
      return sortDataLogic(data, "count", "DESC");
  }
};
