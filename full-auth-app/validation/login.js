//pull in dependencies
onst Validator = require("validator");
const isEmpty = require("is-empty");

//export validLoginInput function that takes data from font-end
module.exports = function validateLoginInput(data) {
  //Instantiate error obj
  let errors = {};

  //convert empty forms to string before validation
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  //return the object error
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
