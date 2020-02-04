const express = require("express");
const pharmacyRoute = require("./routes/pharmacies");
const patientRoute = require("./routes/patients");
const doctorRoute = require("./routes/doctor");
const medicineRoute = require("./routes/medicines");
const authRoute = require("./routes/authRoute");
module.exports = () => {
  const app = express.Router();
  pharmacyRoute(app);
  patientRoute(app);
  doctorRoute(app);
  medicineRoute(app);
  authRoute(app);
  return app;
};
