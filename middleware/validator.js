const { body, param, header, validationResult } = require("express-validator");
const registerationValidationRules = () => [
  // username must be an email
  body("email").notEmpty().isEmail().withMessage("please enter a valid email"),
  // password must be at least 5 chars long
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("password must be 8 characters at least"),
  body("fullName")
    .notEmpty()
    .isLength({ min: 10, max: 50 })
    .withMessage("Name must be 10-50 characters long"),
];

const loginValidationRules = () => [
  body("password").notEmpty().withMessage("password cannot be empty"),
  body("email").notEmpty().withMessage("Name cannot be empty"),
];

const checkAuthorization = () => [
  header("authorization")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("unauthorized"),
];

const getPostRules = () => [param("postId"), header("authorization")];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    errors: errors.array(),
  });
};

module.exports = {
  checkAuthorization,
  loginValidationRules,
  registerationValidationRules,
  validate,
};
