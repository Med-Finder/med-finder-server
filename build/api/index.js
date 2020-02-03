"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _pharmacies = _interopRequireDefault(require("./routes/pharmacies"));

var _patients = _interopRequireDefault(require("./routes/patients"));

var _doctor = _interopRequireDefault(require("./routes/doctor"));

var _medicines = _interopRequireDefault(require("./routes/medicines"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = () => {
  const app = (0, _express.Router)();
  (0, _pharmacies.default)(app);
  (0, _patients.default)(app);
  (0, _doctor.default)(app);
  (0, _medicines.default)(app);
  return app;
};

exports.default = _default;