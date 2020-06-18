const util = require("util");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration/envChecker");
const CustomError = require("./customError");
const User = require("../models/userModel");

const verifyUser = async (req) => {
  try {
    const vrfy = util.promisify(jwt.verify);
    const token = req.headers.authorization;
    const payload = await vrfy(token, JWT_SECRET);
    return await User.findOne({ _id: payload.id });
  } catch (error) {
    throw new CustomError({
      status: 404,
      details: "blabla",
      message: "verification error",
    });
  }
};

module.exports = verifyUser;
