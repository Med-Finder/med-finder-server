const isEmpty = require("is-empty");
const Validator = require("validator");
module.exports = function validateRegisterInputDoctor(req, res, next) {
  //Instantiate our errors object
  let errors = {};
  /*
      Convert all empty fields to strings, before running
      the validation checks (Validator works only with strs)
  */
  const firstName = !isEmpty(req.body.firstName) ? req.body.firstName : "";
  const lastName = !isEmpty(req.body.lastName) ? req.body.lastName : "";
  const speciality = !isEmpty(req.body.speciality) ? req.body.speciality : "";
  const email = !isEmpty(req.body.email) ? req.body.email : "";
  const coordinates = !isEmpty(req.body.coordinates)
    ? req.body.coordinates
    : "";
  const password = !isEmpty(req.body.password) ? req.body.password : "";
  const password2 = !isEmpty(req.body.password2) ? req.body.password2 : "";

  /*
      Checks for empty fields
  */
  //Name check
  if (Validator.isEmpty(firstName)) {
    errors.firstName = "firstName field is required";
  }

  if (Validator.isEmpty(lastName)) {
    errors.lastName = "lastName field is required";
  }

  if (Validator.isEmpty(speciality)) {
    errors.speciality = "speciality field is required";
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
  //coordinates is an array
  if (!Array.isArray(coordinates)) {
    errors.coordinates =
      "coordinates must be an array that follow this pattern [lng, lat] ";
  }
  //coordinates are valid
  if (!(Math.abs(coordinates[0]) <= 180 && Math.abs(coordinates[0]) <= 90)) {
    errors.coordinates = `invalid coordinates , you've entered [lng=${coordinates[0]}, lat=${coordinates[1]}]`;
  }
  //return the error object with any/all errors
  //as well as an isValid boolean that checks to see
  //if we have any error
  if (!isEmpty(errors)) {
    return res.status(400).send(errors);
  }
  req.body = {
    firstName,
    lastName,
    speciality,
    location: { coordinates, type: "Point" },
    email,
    password
  };
  next();
};
