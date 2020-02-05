const { Router } = require("express");
const middlewares = require("../middlewares");
const authService = require("../../services/authServices");
const Logger = require("../../loaders/logger");
const route = Router();

const authRoute = app => {
  app.use("/auth", route);

  route.get("/", (req, res) => console.log("auth route working"));

  route.post(
    "/register",
    middlewares.validator.validateHeadersType,
    middlewares.validator.validateInput,
    (req, res) => {
      Logger.debug("all fields are verified, staring to work ");
      console.log(req.body);
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
    // middlewares.validator.validateHeadersType,
    // middlewares.validator.validateLogInInput,
    (req, res) => {
      Logger.debug("all fields are verified, staring to work ");
      const Patient = new authService(req.body);
      Patient.logIn((error, result) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res.send(result);
      });
    }
  );
};

module.exports = authRoute;
