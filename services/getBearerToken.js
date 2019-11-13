const fetch = require("node-fetch");
const keys = require("../config/keys");

// Headers is a native construct of the Fetch API. Need to make it global before using it.
global.fetch = fetch;
global.Headers = fetch.Headers;

module.exports = async () => {
  // Headers
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const encoded = Buffer.from(
    `${keys.redditClientId}:${keys.redditClientSecret}`
  ).toString("base64");
  headers.append("Authorization", `Basic ${encoded}`);

  // Search Params
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  // Request Options
  const options = {
    method: "POST",
    headers: headers,
    body: params
  };

  // Make the request
  try {
    const res = await fetch(
      "https://www.reddit.com/api/v1/access_token",
      options
    );
    const data = await res.json();

    const accessToken = data.access_token;
    // from the headers
    const issuedAt = new Date(res.headers.get("date"));

    console.log("New accessToken:", { accessToken, issuedAt });

    return { accessToken, issuedAt };
  } catch (e) {
    console.error(e);
  }
};
