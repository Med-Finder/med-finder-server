const { DoctorModel } = require("../models");

module.exports = class DoctorServices {
  constructor({ lng, lat } = {}) {
    this.lng = lng;
    this.lat = lat;
  }
  searchDoctor(query, callback) {
    const regExpQuery = new RegExp(query, "g");
    DoctorModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [this.lng, this.lat]
          },
          $maxDistance: 100000 // in meter
        }
      },
      openingHour: { $lt: new Date().getHours() },
      closingHour: { $gt: new Date().getHours() },
      $or: [
        { firstName: regExpQuery },
        { lastName: regExpQuery },
        { speciality: regExpQuery }
      ]
    })
      .then(data => callback(null, data))
      .catch(err => callback(err, null));
  }
};
