//Pull in dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

/*
exports validateRegisterInput, that takes `data` as param
sent from the frontend registration form
*/
module.exports = function validateRegisterInput(data) {
  //Instantiate our errors object

  let errors = {};

    /*
    Convert all empty fields to strings, before running
    the validation checks (Validator works only with strs)
    */
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  /*
    Checks for empty fields
    */
  //Name check
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

    /*
    Checks for empty fields
    */
  //Name check
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

    //Password check
  //password empty
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
//password length
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
// match password
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  //return the error object with any/all errors
  //as well as an isValid boolean that checks to see
  //if we have any error
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
