"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _patientServices = _interopRequireDefault(require("../../services/patientServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)();

const patientRoute = app => {
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser.default.json());
  app.use('/patient', route);
  route.get('/', (req, res) => console.log(' \n patient route working'));
  const patientServicesInstance = new _patientServices.default();
  route.post('/register', async (req, res, next) => {
    // console.log("req body", req.body);
    const patientInput = { ...req.body
    };
    patientServicesInstance.createPatient(patientInput).then(data => console.log(data, "created patient")).catch(err => console.log(err));
    return res.status(200);
  });
};

var _default = patientRoute;
exports.default = _default;