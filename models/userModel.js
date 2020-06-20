const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const axios = require("axios");
const CustomError = require("../helpers/customError");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    maxlength: 50,
    minlength: 10,
    required: true,
    trim: true,
  },
  email: { type: String, unique: true },
  password: { type: String, minlength: 8, required: true },
  subscriptions: [{ type: String }],
});

// presave functions
userSchema.pre("save", async function () {
  const userdoc = this;
  // hashing password and replacing original one
  const SALT_ROUNDS = 10;
  const hashed = await bcrypt.hash(userdoc.password, SALT_ROUNDS);
  userdoc.password = hashed;
});

// instance methods

userSchema.methods.subscribe = function (sourceId) {
  this.updateOne({ $addToSet: { subscriptions: sourceId } })
    .then((res) => res)
    .catch((err) => {
      throw new CustomError({
        message: err.message,
        status: 500,
      });
    });
};

userSchema.methods.unsubscribe = function (sourceId) {
  this.updateOne({ $pull: { subscriptions: sourceId } })
    .then((res) => res)
    .catch((err) => {
      throw new CustomError({
        message: err.message,
        status: 500,
      });
    });
};

// get news from newsapi using axios
userSchema.methods.getNews = async function (page) {
  const news = this.get("subscriptions").join();
  try {
    if (news) {
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=${news}&pageSize=10&page=${page}`,
        {
          headers: { "X-Api-Key": "45b7e93a7b644836a0fb6abc2e6bb278" },
        }
      );
      return data;
    }
  } catch (err) {
    throw new CustomError({
      status: 404,
      details: "newsApi Error",
      message: "newsApi error",
    });
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
