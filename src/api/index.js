const express = require("express");
const pharmacyRoute = require("./routes/pharmacies");
// const patientRoute = require("./routes/patients");
const doctorRoute = require("./routes/doctor");
const medicineRoute = require("./routes/medicines");
const authRoute = require("./routes/authRoute");
const pescriptionRoute = require("./routes/pescriptionRoute");
module.exports = () => {
  const app = express.Router();
  pharmacyRoute(app);
  // patientRoute(app);
  doctorRoute(app);
  medicineRoute(app);
  authRoute(app);
  pescriptionRoute(app);
  return app;
};
