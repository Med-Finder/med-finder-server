const { DoctorModel } = require("../models");

module.exports = class DoctorServices {
  constructor(userCoordinates) {
    this.userCoordinates = userCoordinates;
  }
  searchDoctor(query, callback) {
    const regExpQuery =
      query === '""' ? new RegExp("", "g") : new RegExp(query, "g");
    DoctorModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: this.userCoordinates
          },
          $maxDistance: 100000000 // in meter
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
