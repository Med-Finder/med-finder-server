const { PharmacyModel, MedicinesModel } = require("../models");
module.exports = class PharmacyServices {
  constructor({ pharmacyId, medicineId, query, coordinates, distance } = {}) {
    this.pharmacyId = pharmacyId;
    this.medicineId = medicineId;
    this.query = query === '""' ? new RegExp("", "g") : new RegExp(query, "g");
    this.coordinates = coordinates;
    this.distance = Number(distance) > 0 ? Number(distance) : 1000000;
  }
  async locatePharmacies() {
    var found = await PharmacyModel.find({});
    return found;
  }

  searchPharmacies(callback) {
    PharmacyModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: this.coordinates
          },
          $maxDistance: this.distance // in meter
        }
      },
      openingHour: { $lt: new Date().getHours() },
      closingHour: { $gt: new Date().getHours() },
      name: this.query
    })
      .then(data => callback(null, data))
      .catch(err => callback(err, null));
  }

  retriveAllMedicine(pharmacyId, callback) {
    PharmacyModel.findById(pharmacyId)
      .populate("medicines")
      .then(res => res.medicines)
      .then(pharmacieList => callback(null, pharmacieList))
      .catch(err => callback(err, null));
  }

  async addMedicines() {
    try {
      let phar = await PharmacyModel.findByIdAndUpdate(this.pharmacyId, {
        $push: { medicines: this.medicineId }
      });
      let med = await MedicinesModel.findByIdAndUpdate(this.medicineId, {
        $push: { pharmacyId: this.pharmacyId }
      });
      return !(phar && med) ? "invalid ids" : "done";
    } catch (err) {
      return err;
    }
  }
};
