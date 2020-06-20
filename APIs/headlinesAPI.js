const express = require("express");
const router = express.Router();
const axios = require("axios");

// get headlines for carousel component
router.get("/", async (req, res, next) => {
  const { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?sources=bbc-news`,
    {
      headers: { "X-Api-Key": "99b2e87ef38f4ed3ad53e88d95386c30" },
    }
  );

  return res.status(200).send(data.articles);
});

module.exports = router;
