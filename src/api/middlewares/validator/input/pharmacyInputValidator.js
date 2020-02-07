const isEmpty = require("is-empty");
const Validator = require("validator");
module.exports = function validateRegisterInputPharmacy(req, res, next) {
  //Instantiate our errors object
  let errors = {};
  /*
      Convert all empty fields to strings, before running
      the validation checks (Validator works only with strs)
  */
  const name = !isEmpty(req.body.name) ? req.body.name : "";
  const address = !isEmpty(req.body.address) ? req.body.address : "";
  const phoneNumber = !isEmpty(req.body.phoneNumber)
    ? req.body.phoneNumber
    : "";
  const email = !isEmpty(req.body.email) ? req.body.email : "";
  const password = !isEmpty(req.body.password) ? req.body.password : "";
  const password2 = !isEmpty(req.body.password2) ? req.body.password2 : "";

  /*
      Checks for empty fields
  */
  //Name check
  if (Validator.isEmpty(name)) {
    errors.name = "name field is required";
  }

  if (Validator.isEmpty(address)) {
    errors.address = "address field is required";
  }

  if (Validator.isEmpty(phoneNumber)) {
    errors.phoneNumber = "phoneNumber field is required";
  }
  // Email checks
  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  //Password check
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  //password empty
  if (Validator.isEmpty(password2)) {
    errors.password2 = "Confirm password field is required";
  }
  //password length
  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  // match password
  if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }
  //return the error object with any/all errors
  //as well as an isValid boolean that checks to see
  //if we have any error
  if (!isEmpty(errors)) {
    return res.status(400).send(errors);
  }
  req.body = { name, address, phoneNumber, email, password };
  next();
};
