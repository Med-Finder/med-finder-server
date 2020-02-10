const { MedicinesModel } = require("../models");
module.exports = class MedicineServices {
  async createMedicine(medicine) {
    try {
      const newMedicine = new MedicinesModel({
        name: medicine.name,
        medicineClass: medicine.medicineClass,
        cost: medicine.cost,
        administrationRoute: medicine.administrationRoute,
        dosageForm: medicine.dosageForm,
        dosageschedule: medicine.dosageschedule,
        medicineUnit: medicine.medicineUnit,
        expiringDay: medicine.expiringDay,
        prescriptionStatus: medicine.prescriptionStatus,
        code: medicine.code,
        warning: medicine.warning,
        sameAs: medicine.sameAs,
        quantity: medicine.quantity
      });

      let savedMedicine = await newMedicine.save(); //when fail its goes to catch
      console.log("medecine saved in database "); //when successsss it print.
      return savedMedicine;
    } catch (err) {
      console.log("err" + err);
      res.status(500).send(err);
    }
  }
  async searchMedicine(query) {
    try {
      var searchResult = await MedicinesModel.search(query).populate({
        path: "pharmacyId"
      });
      return searchResult;
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
  async getAllMedicines() {
    var found = await MedicinesModel.find({});
    return found;
  }
  async addPharmacy(query, pharmacyId) {
    await MedicinesModel.search(query)
      .then(data => {
        console.log(data[0].pharmacyId, "helloooooo from medicine");
        data[0].pharmacyId.push(pharmacyId);
        data[0].save();
        console.log(data);
      })
      .catch(err => console.log(err, "error updating med"));
  }
  async getMedsLocations(query) {
    const result = await MedicinesModel.search(query).populate({
      path: "pharmacyId"
    });
    return result;
  }
};
