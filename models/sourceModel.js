const mongoose = require("mongoose");
const axios = require("axios");
const CustomError = require("../helpers/customError");
const { Schema } = mongoose;

const sourceSchema = new Schema({
  id: { type: String },
  name: { type: String },
  description: { type: String },
  url: { type: String },
  category: { type: String },
  language: { type: String },
  country: { type: String },
  status: { type: String, default: false },
});

const Source = mongoose.model("Source", sourceSchema);
module.exports = Source;
