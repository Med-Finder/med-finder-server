const { Router } = require("express");
const { validator } = require("../middlewares");
const passport = require("passport");
const authService = require("../../services/authServices");
const Logger = require("../../loaders/logger");
const route = Router();

const authRoute = app => {
  app.use("/auth", route);

  route.get(
    "/",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => (console.log(req.user, req.authInfo), res.send("done"))
  );

  route.post(
    "/register",
    validator.validateHeadersType,
    validator.validateInput,
    (req, res) => {
      Logger.debug("all fields are verified, staring to work ");
      const newUser = new authService(req.body, req.headers.headerstype);
      newUser.register((err, patient) => {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).send(patient);
      });
    }
  );

  route.post(
    "/logIn",
    validator.validateHeadersType,
    validator.validateLogInInput,
    (req, res) => {
      Logger.debug("all fields are verified, staring to work ");
      const User = new authService(req.body, req.headers.headerstype);
      User.logIn((error, result) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res.send(result);
      });
    }
  );
};

module.exports = authRoute;
