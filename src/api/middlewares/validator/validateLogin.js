const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLogInInput(req, res, next) {
  let errors = {};
  //convert empty forms to string before validation
  const email = !isEmpty(req.body.email) ? req.body.email : "";
  const password = !isEmpty(req.body.password) ? req.body.password : "";

  // Email checks
  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  //return the object error
  if (!isEmpty(errors)) {
    return res.status(400).send(errors);
  }
  req.body = { email, password };
  next();
};
