const axios = require("axios");

async function getSources(currentUser) {
  const subscriptions = await currentUser.get("subscriptions");
  const { data } = await axios.get(
    `https://newsapi.org/v2/sources?language=en`,
    {
      headers: { "X-Api-Key": "45b7e93a7b644836a0fb6abc2e6bb278" },
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
