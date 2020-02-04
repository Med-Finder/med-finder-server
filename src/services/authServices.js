const { PatientModel } = require("../models");
const Logger = require("../loaders/logger");
const bcrypt = require("bcryptjs");
module.exports = class AuthServices {
  constructor({ firstName, lastName, email, password } = {}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  async register() {
    // // Form validation
    // //deconstruct errors from validateRegisterInput
    // const { errors, isValid } = validateRegisterInput(req.body); take this part to a middle ware
    // // Check validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    // find user by email
    console.log(this.firstName, this.lastName);
    Logger.silly("searching for a user with sama email");
    PatientModel.findOne({ email: this.email })
      .then(patient => {
        if (patient) {
          Logger.error("a user with the same email exists 🙅");
          return { email: "Email already exists" };
        } else {
          Logger.silly("creating salt 😄");
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              Logger.error("err with making salt 🔥");
              throw err;
            }
            Logger.silly("hashing password 😄");
            bcrypt.hash(this.password, salt, (err, hash) => {
              if (err) {
                Logger.error("err with hashing 🔥");
                throw err; // try this}
              }
              Logger.silly("making new user 😄");
              const newPatient = new PatientModel({
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: hash
              });
              Logger.silly("saving 😴");
              newPatient
                .save()
                .then(user => {
                  Logger.silly("done 😴");
                  return user;
                })
                .catch(err => {
                  Logger.error("err with saving user 🔥");
                  throw err;
                });
            });
          });
        }
      })
      .catch(err => {
        Logger.error("err with find one user 🔥");
        throw err;
      });
  }

  logIn() {}
};
