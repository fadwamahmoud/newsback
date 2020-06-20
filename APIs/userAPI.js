const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const CustomError = require("../helpers/customError");
const { JWT_SECRET } = require("../configuration/envChecker");
const verifyUser = require("../helpers/userVerification");
const User = require("../models/userModel");
const {
  loginValidationRules,
  registerationValidationRules,
  checkAuthorization,
  validate,
} = require("../middleware/validator");
const { getSources } = require("../helpers/getSources");

// register
router.post(
  "/register",
  registerationValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      const {
        body: { fullName, password, email },
      } = req;
      const newUser = new User({
        fullName,
        password,
        email,
      });

      // sanitize
      const createdUser = await newUser.save();
      const instance = _.omit(createdUser.toJSON(), "password");
      return res.status(201).send(instance);
    } catch (error) {
      next(error);
    }
  }
);

// login
router.post(
  "/login",
  loginValidationRules(),
  validate,
  async (req, res, next) => {
    const {
      body: { email, password },
    } = req;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new CustomError({
          message: "user does not exist",
          status: 404,
        });
      }
      const isMatch = await bcrypt.compare(password, user.toJSON().password);

      if (isMatch) {
        // generate token
        const sanitizedUser = _.omit(
          user,
          "password",
          "__v",
          "subscriptions",
          "_id"
        );
        const id = user._id;
        const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "60m" });
        return res.status(200).send({ user: sanitizedUser, token });
      }
      throw new CustomError({
        message: "either username or password are wrong",
        status: 500,
      });
    } catch (err) {
      next(err);
    }
  }
);

// subscribe
router.patch(
  "/subscribe/:sourceId",
  checkAuthorization(),
  validate,
  async (req, res, next) => {
    try {
      const {
        params: { sourceId },
      } = req;
      const currentUser = await verifyUser(req);

      if (!currentUser) {
        throw new CustomError({
          message: "user not authenticated",
          status: 401,
        });
      } else {
        await currentUser.subscribe(sourceId);
        return res.status(202).send();
      }
    } catch (err) {
      next(err);
    }
  }
);

// unsubscribe
router.patch(
  "/unsubscribe/:sourceId",
  checkAuthorization(),
  validate,
  async (req, res, next) => {
    try {
      const {
        params: { sourceId },
      } = req;
      const currentUser = await verifyUser(req);

      if (!currentUser) {
        throw new CustomError({
          message: "user not authenticated",
          status: 401,
        });
      } else {
        await currentUser.unsubscribe(sourceId);
        return res.status(202).send();
      }
    } catch (err) {
      next(err);
    }
  }
);

// get customized sources from subscription array
router.get(
  "/feed/:page",
  checkAuthorization(),
  validate,
  async (req, res, next) => {
    try {
      const currentUser = await verifyUser(req);

      if (!currentUser) {
        throw new CustomError({
          message: "user not authenticated",
          status: 401,
        });
      } else {
        const news = await currentUser.getNews(req.params.page);
        // returns strnig in case of no subscriptions
        if (news) return res.status(200).send(news);
        return res.status(200).send("no subscriptions");
      }
    } catch (err) {
      next(err);
    }
  }
);

// get all sources from /sources endpoint
router.get(
  "/sources",
  checkAuthorization(),
  validate,
  async (req, res, next) => {
    try {
      const currentUser = await verifyUser(req);
      if (!currentUser) {
        throw new CustomError({
          message: "user not authenticated",
          status: 401,
        });
      } else {
        const newSources = await getSources(currentUser);
        return res.status(202).send(newSources);
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
