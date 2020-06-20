const axios = require("axios");

async function getSources(currentUser) {
  const subscriptions = await currentUser.get("subscriptions");
  const { data } = await axios.get(
    `https://newsapi.org/v2/sources?language=en`,
    {
      headers: { "X-Api-Key": "99b2e87ef38f4ed3ad53e88d95386c30" },
    }
  );
  const newSources = data.sources.map((source) => {
    if (subscriptions.includes(source.id)) {
      return { ...source, status: true };
    }
    return { ...source, status: false };
  });
  return newSources;
}
exports.getSources = getSources;
