const { PharmacyModel, MedicinesModel } = require("../models");
module.exports = class PharmacyServices {
  async locatePharmacies() {
    var found = await PharmacyModel.find({});
    return found;
  }

  searchPharmacies(query, userCoordinates, callback) {
    const regExpQuery =
      query === '""' ? new RegExp("", "g") : new RegExp(query, "g");
    PharmacyModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: userCoordinates
          },
          $maxDistance: 100000 // in meter
        }
      },
      openingHour: { $lt: new Date().getHours() },
      closingHour: { $gt: new Date().getHours() },
      name: regExpQuery
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

  async addMedicines(pharmacyId, medicineId) {
    try {
      await PharmacyModel.findByIdAndUpdate(pharmacyId, {
        $push: { medicines: medicineId }
      });
      await MedicinesModel.findByIdAndUpdate(medicineId, {
        $push: { pharmacyId: pharmacyId }
      });
      return "done adding";
    } catch (err) {
      return err;
    }
  }
};
