const express = require("express");
const router = express.Router();
const axios = require("axios");

// get headlines for carousel component
router.get("/", async (req, res, next) => {
  const { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?sources=bbc-news`,
    {
      headers: { "X-Api-Key": "45b7e93a7b644836a0fb6abc2e6bb278" },
    }
  );

  return res.status(200).send(data.articles);
});

module.exports = router;
