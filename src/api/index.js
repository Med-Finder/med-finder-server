const express = require("express");
const pharmacyRoute = require("./routes/pharmacies");
// import authRoute from "./routes/authRoute";
module.exports = () => {
  const app = express.Router();
  pharmacyRoute(app);
  // authRoute(app);
  return app;
};
