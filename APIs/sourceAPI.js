const express = require("express");
const router = express.Router();
const axios = require("axios");
const CustomError = require("../helpers/customError");
const Source = require("../models/sourceModel");
const User = require("../models/userModel");

// get all sources
router.post("/", async (req, res) => {
  const { data } = await axios.get(
    `https://newsapi.org/v2/sources?language=en`,
    {
      headers: { "X-Api-Key": "45b7e93a7b644836a0fb6abc2e6bb278" },
    }
  );
  console.log(data.sources);
  data.sources.forEach(async (source) => {
    const newSource = new Source({
      id: source.id,
      name: source.name,
      description: source.description,
      url: source.url,
      category: source.category,
      language: source.language,
      country: source.country,
    });
    await newSource.save();
    res.status(201).send("sources created");
  });
});

// get sources
router.get("/", async (req, res, next) => {});

module.exports = router;
