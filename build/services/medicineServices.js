"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Medicines = _interopRequireDefault(require("../models/Medicines"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MedicineServices {
  constructor(medicine) {
    medicine = new _Medicines.default();
  }

  async createMedicine(medicine) {
    try {
      const newMedicine = new _Medicines.default({
        "name": medicine.name,
        "medicineClass": medicine.medicineClass,
        "cost": medicine.cost,
        "administrationRoute": medicine.administrationRoute,
        "dosageForm": medicine.dosageForm,
        "dosageschedule": medicine.dosageschedule,
        "medicineUnit": medicine.medicineUnit,
        "expiringDay": medicine.expiringDay,
        "prescriptionStatus": medicine.prescriptionStatus,
        "code": medicine.code,
        "warning": medicine.warning,
        "sameAs": medicine.sameAs,
        "quantity": medicine.quantity
      });
      let savedMedicine = await newMedicine.save(); //when fail its goes to catch

      console.log("medecine saved in database "); //when successsss it print.

      return savedMedicine;
    } catch (err) {
      console.log('err' + err);
      res.status(500).send(err);
    }
  }

  async searchMedicine(query) {
    try {
      var searchResult = await _Medicines.default.search(query);
      return searchResult;
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

}

exports.default = MedicineServices;