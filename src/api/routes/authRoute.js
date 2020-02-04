const { Router } = require("express");
const middlewares = require("../middlewares");
const authService = require("../../services/authServices");
const Logger = require("../../loaders/logger");
const route = Router();

const authRoute = app => {
  app.use("/auth", route);

  route.get("/", (req, res) => console.log("auth route working"));

  route.post("/register", middlewares.validateRegisterInput, (req, res) => {
    Logger.debug("all fields are verified, staring to work :100:");
    const newPatient = new authService(req.body);
    newPatient.register((err, patient) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(patient);
    });
  });
};

module.exports = authRoute;
