const { DoctorModel } = require("../models");

module.exports = class DoctorServices {
  constructor({ coordinates, query, distance } = {}) {
    this.coordinates = coordinates;
    this.query = query === '""' ? new RegExp("", "g") : new RegExp(query, "g");
    this.distance = Number(distance) > 0 ? Number(distance) : 1000000;
  }
  searchDoctor(callback) {
    DoctorModel.find({
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
      $or: [
        { firstName: this.query },
        { lastName: this.query },
        { speciality: this.query }
      ]
    })
      .then(data => callback(null, data))
      .catch(err => callback(err, null));
  }
};
