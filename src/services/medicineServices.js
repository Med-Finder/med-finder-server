const { MedicinesModel, PharmacyModel } = require("../models");

module.exports = class MedicineServices {
  constructor(coordinates) {
    this.coordinates = coordinates;
  }
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
  // async searchMedicine(query) {
  //   try {
  //     var searchResult = await MedicinesModel.search(query).populate({
  //       path: "pharmacyId"
  //     });
  //     return searchResult;
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).send(err);
  //   }
  // }
  searchMedicine(query, callback) {
    const regExpQuery =
      query === '""' ? new RegExp("", "g") : new RegExp(query, "g");
    PharmacyModel.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: this.coordinates },
          key: "location",
          distanceField: "dist.calculated",
          maxDistance: 100000
        }
      },
      { $unwind: "$medicines" },
      {
        $lookup: {
          from: "medicines",
          localField: "medicines",
          foreignField: "_id",
          as: "medicines"
        }
      },
      { $unwind: "$medicines" },
      { $match: { "medicines.name": regExpQuery } },
      {
        $set: {
          open: {
            $and: [
              { $lt: ["$openingHour", new Date().getHours()] },
              { $gt: ["$closingHour", new Date().getHours()] }
            ]
          }
        }
      },
      { $match: { open: true } },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          coordinates: { $first: "$location.coordinates" }
        }
      }
    ])
      .then(data => callback(null, data))
      .catch(err => callback(err, null));
  }

  async getAllMedicines() {
    var found = await MedicinesModel.find({});
    return found;
  }
  // async addPharmacy(query, pharmacyId) {
  //   await MedicinesModel.search(query)
  //     .then(data => {
  //       data[0].pharmacyId.push(pharmacyId);
  //       data[0].save();
  //     })
  //     .catch(err => console.log(err, "error updating med"));
  // }
  async getMedsLocations(query) {
    const result = await MedicinesModel.search(query).populate({
      path: "pharmacyId"
    });
    return result;
  }
};
