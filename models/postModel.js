const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const util = require("util");
const { JWT_SECRET } = require("../helpers/envChecker");
const Schema = mongoose.Schema;
const postSchema = new Schema(
  {
    title: { type: String, maxlength: 50, required: true },
    body: { type: String, minlength: 150, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    //full text search implementation for tags
    tags: { type: [{ type: String, maxlength: 10 }], index: true },
    img: String,
  },
  { timestamps: true }
);

//edit post
postSchema.statics.editPost = function (req) {
  //TODO lodash pick
  //TODO userId by token
  this.updateOne({ _id: req.params.postId }, { $set: req.body }, function (
    err,
    post
  ) {
    console.log(post);

    if (err) throw new customError({ message: "error updating post" });
  });
};

postSchema.statics.getPostsBy = function (userIds) {
  return this.find({ userId: { $in: userIds } });
};

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
