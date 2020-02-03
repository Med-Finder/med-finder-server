"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _medicineServices = _interopRequireDefault(require("../../services/medicineServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)();

const medicineRoute = app => {
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser.default.json());
  app.use('/medicine', route);
  route.get('/', (req, res) => console.log('medicine route working'));
  const MedicineServicesInstance = new _medicineServices.default();
  route.post('/save', async (req, res, next) => {
    // console.log("req body", req.body);
    const medicineInput = { ...req.body
    };
    MedicineServicesInstance.createMedicine(medicineInput).then(data => console.log(data, "\n medicine saved in database")).catch(err => console.log(err, "lerrrrrrrrrrrrrrr"));
    return res.status(200);
  });
  route.post('/search', async (req, res) => {
    let input = { ...req.body
    };
    console.log(input);
    MedicineServicesInstance.searchMedicine(input.query).then(data => res.json(data)).catch(err => console.log(err, "dddd"));
  });
};

var _default = medicineRoute;
exports.default = _default;