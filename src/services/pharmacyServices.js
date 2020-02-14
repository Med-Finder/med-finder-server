const { PharmacyModel, MedicinesModel } = require("../models");
module.exports = class PharmacyServices {
  async createPharmacy(pharmacy) {
    try {
      const newPharmacy = new PharmacyModel({
        name: pharmacy.name,
        address: pharmacy.address,
        phoneNumber: pharmacy.phoneNumber,
        // lat: pharmacy.lat,
        // lng: pharmacy.lng,
        location: pharmacy.location,
        openingHour: pharmacy.openingHour,
        closingHour: pharmacy.closingHour,
        feedbacks: pharmacy.feedbacks,
        password: pharmacy.password
      });

      let savedPharmacy = await newPharmacy.save(); //when fail its goes to catch
      console.log("pharmacy created in database in database"); //when successsss it print.
      return savedPharmacy;
    } catch (err) {
      console.log("err" + err);
      res.status(500).send(err);
    }
  }
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

  // async searchPharmacies(query, userCoordinates) {
  //   try {
  //     console.log(query, userCoordinates);
  //     var searchResult = await PharmacyModel.find({
  //       location: {
  //         $near: {
  //           $geometry: {
  //             type: "Point",
  //             coordinates: [userCoordinates.lng, userCoordinates.lat]
  //           },
  //           $maxDistance: 10000 // in meter
  //         }
  //       }
  //     })
  //       // .search(query)
  //       .populate({
  //         path: "medicines"
  //       })
  //       .lean();
  //     searchResult = searchResult.filter(
  //       pharmacy =>
  //         pharmacy.openingHour < new Date().getHours() &&
  //         pharmacy.closingHour > new Date().getHours()
  //     );
  //     return searchResult;
  //   } catch (e) {
  //     return e;
  //   }
  // }
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
