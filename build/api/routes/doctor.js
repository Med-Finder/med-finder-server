"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _doctorServices = _interopRequireDefault(require("../../services/doctorServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)();

const doctorRoute = app => {
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser.default.json());
  app.use('/doctor', route);
  route.get('/', (req, res) => console.log('\n doctor route working'));
  const doctorServicesInstance = new _doctorServices.default();
  route.post('/register', async (req, res, next) => {
    const doctorInput = { ...req.body
    };
    doctorServicesInstance.createDoctor(doctorInput).then(data => console.log(data, "created doctor")).catch(err => console.log(err));
    return res.status(200);
  });
};

var _default = doctorRoute;
exports.default = _default;