const isEmpty = require("is-empty");
const Validator = require("validator");
module.exports = function validateRegisterInput(req, res, next) {
  //Instantiate our errors object
  let errors = {};
  /*
      Convert all empty fields to strings, before running
      the validation checks (Validator works only with strs)
      */
  req.body.firstName = !isEmpty(req.body.firstName) ? req.body.firstName : "";
  req.body.lastName = !isEmpty(req.body.lastName) ? req.body.lastName : "";
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";
  req.body.password2 = !isEmpty(req.body.password2) ? req.body.password2 : "";

  /*
      Checks for empty fields
      */
  //Name check
  if (Validator.isEmpty(req.body.firstName)) {
    errors.firstName = "firstName field is required";
  }

  if (Validator.isEmpty(req.body.lastName)) {
    errors.lastName = "lastName field is required";
  }
  // Email checks
  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid";
  }

  /*
      Checks for empty fields
      */
  //Name check
  if (Validator.isEmpty(req.body.password)) {
    errors.password = "Password field is required";
  }

  //Password check
  //password empty
  if (Validator.isEmpty(req.body.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  //password length
  if (!Validator.isLength(req.body.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  // match password
  if (!Validator.equals(req.body.password, req.body.password2)) {
    errors.password2 = "Passwords must match";
  }
  //return the error object with any/all errors
  //as well as an isValid boolean that checks to see
  //if we have any error
  if (!isEmpty(errors)) {
    return res.status(400).send(errors);
  }
  next();
};
