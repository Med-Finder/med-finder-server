const patient = require("./patientInputValidator");
const doctor = require("./doctorInputValidator");
const pharmacy = require("./pharmacyInputValidator");
module.exports = (req, res, next) => {
  const validators = {
    patient,
    doctor,
    pharmacy
  };
  validators[req.headers.headerstype](req, res, next);
};
