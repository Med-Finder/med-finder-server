const { Router } = require("express");
// import middlewares from "../middlewares";
const authService = require("../../services/authServices");

const route = Router();

const authRoute = app => {
  app.use("/auth", route);

  route.get("/", (req, res) => console.log("auth route working"));

  route.post("/register", async (req, res) => {
    const newPatient = new authService(req.body);
    newPatient.register().then(resulta => res.send(resulta));
  });
};

module.exports = authRoute;
