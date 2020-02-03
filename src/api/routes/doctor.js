const { Router } = require("express");
const middlewares = require("../middlewares");
const bodyParser = require("body-parser");
const DoctorServices = require("../../services/doctorServices");

const route = Router();

const doctorRoute = app => {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  app.use("/doctor", route);

  route.get("/", (req, res) => console.log("\n doctor route working"));

  const doctorServicesInstance = new DoctorServices();

  route.post("/register", async (req, res, next) => {
    const doctorInput = { ...req.body };
    doctorServicesInstance
      .createDoctor(doctorInput)
      .then(data => console.log(data, "created doctor"))
      .catch(err => console.log(err));
    return res.status(200);
  });
};

module.exports = doctorRoute;
