"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pharmacy = _interopRequireDefault(require("../models/Pharmacy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PharmacyServices {
  constructor(pharmacy) {
    pharmacy = new _Pharmacy.default();
  }

  async createPharmacy(pharmacy) {
    try {
      const newPharmacy = new _Pharmacy.default({
        "name": pharmacy.name,
        "adress": pharmacy.adress,
        "phoneNumber": pharmacy.phoneNumber,
        "latitude": pharmacy.latitude,
        "longitude": pharmacy.longitude,
        "openingHour": pharmacy.openingHour,
        "closingHour": pharmacy.closingHour,
        "feedbacks": pharmacy.feedbacks,
        "password": pharmacy.password
      });
      let savedPharmacy = await newPharmacy.save(); //when fail its goes to catch

      console.log("pharmacy created in database in database"); //when successsss it print.

      return savedPharmacy;
    } catch (err) {
      console.log('err' + err);
      res.status(500).send(err);
    }
  }

  async locatePharmacies() {
    var found = await _Pharmacy.default.find({});
    return found;
  }

  async searchPharmacies(query) {
    var searchResult = await _Pharmacy.default.search(query);
    return searchResult;
  }

}

exports.default = PharmacyServices;