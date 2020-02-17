const { MedicinesModel, PharmacyModel } = require("../models");

module.exports = class MedicineServices {
  constructor({
    coordinates,
    query,
    distance,
    name,
    medicineClass,
    cost,
    administrationRoute,
    dosageForm,
    dosageschedule,
    medicineUnit,
    expiringDay,
    prescriptionStatus,
    code,
    warning,
    sameAs,
    quantity
  } = {}) {
    this.coordinates = coordinates;
    this.query = query === '""' ? new RegExp("", "g") : new RegExp(query, "g");
    this.distance = Number(distance) > 0 ? Number(distance) : 1000000;
    this.name = name;
    this.medicineClass = medicineClass;
    this.cost = cost;
    this.administrationRoute = administrationRoute;
    this.dosageForm = dosageForm;
    this.dosageschedule = dosageschedule;
    this.medicineUnit = medicineUnit;
    this.expiringDay = expiringDay;
    this.prescriptionStatus = prescriptionStatus;
    this.code = code;
    this.warning = warning;
    this.sameAs = sameAs;
    this.quantity = quantity;
  }

  searchMedicine(callback) {
    PharmacyModel.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: this.coordinates },
          key: "location",
          distanceField: "dist.calculated",
          maxDistance: this.distance
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
      {
        $match: {
          "medicines.name": this.query
        }
      },

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

  async createMedicine() {
    try {
      const newMedicine = new MedicinesModel({
        name: this.name,
        medicineClass: this.medicineClass,
        cost: this.cost,
        administrationRoute: this.administrationRoute,
        dosageForm: this.dosageForm,
        dosageschedule: this.dosageschedule,
        medicineUnit: this.medicineUnit,
        expiringDay: this.expiringDay,
        prescriptionStatus: this.prescriptionStatus,
        code: this.code,
        warning: this.warning,
        sameAs: this.sameAs,
        quantity: this.quantity
      });
      return await newMedicine.save(); //when fail its goes to catch
    } catch (err) {
      return err;
    }
  }
};
