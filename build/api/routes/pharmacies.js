"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _pharmacyServices = _interopRequireDefault(require("../../services/pharmacyServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)();

const pharmacyRoute = app => {
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser.default.json());
  app.use('/pharmacy', route);
  route.get('/', (req, res) => console.log('pharmacy route working'));
  const pharmacyServicesInstance = new _pharmacyServices.default();
  route.post('/create', async (req, res, next) => {
    // console.log("req body", req.body);
    const pharmacyInput = { ...req.body
    };
    pharmacyServicesInstance.createPharmacy(pharmacyInput).then(data => console.log(data, " \n created pharmacy")).catch(err => console.log(err));
    return res.status(200);
  });
  route.get('/locateAllPharmacies', async (req, res, next) => {
    console.log("locate pharmacy route");
    pharmacyServicesInstance.locatePharmacies().then(data => {
      var result = data.map(pharmacy => {
        var obj = {};
        obj.lat = pharmacy.latitude;
        obj.lng = pharmacy.longitude;
        obj.label = pharmacy.name[0].toUpperCase();
        obj.draggable = false;
        obj.title = 'Pharmacy ' + pharmacy.name;
        obj.www = `https://www.Pharmacy-${pharmacy.name.slice(0, 5)}.com/`;
        return obj;
      });
      res.json(result);
    }).catch(err => console.log(err));
    return res.status(200);
  });
  route.post('/search', async (req, res) => {
    let input = { ...req.body
    };
    console.log(input);
    pharmacyServicesInstance.searchPharmacies(input.query.toString()).then(data => {
      var result = data.map(pharmacy => {
        var obj = {};
        obj.lat = pharmacy.latitude;
        obj.lng = pharmacy.longitude;
        obj.label = pharmacy.name[0].toUpperCase();
        obj.draggable = false;
        obj.title = 'Pharmacy ' + pharmacy.name;
        obj.www = `https://www.Pharmacy-${pharmacy.name.slice(0, 5)}.com/`;
        return obj;
      });
      res.json(result);
    }).catch(err => console.log(err));
    return res.status(200);
  });
};

var _default = pharmacyRoute;
exports.default = _default;