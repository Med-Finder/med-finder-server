"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Doctor = _interopRequireDefault(require("../models/Doctor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DoctorServices {
  constructor(doctor) {
    doctor = new _Doctor.default();
  }

  async createDoctor(doctor) {
    try {
      const newDoctor = new _Doctor.default({
        "name": doctor.name,
        "speciality": doctor.speciality,
        "email": doctor.email,
        "image": doctor.image,
        "latitude": doctor.latitude,
        "longitude": doctor.longitude,
        "openingHour": doctor.openingHour,
        "closingHour": doctor.closingHour,
        "password": doctor.password
      });
      let savedDoctor = await newDoctor.save(); //when fail its goes to catch

      console.log("doctor created in database "); //when successsss it print.

      return savedDoctor;
    } catch (err) {
      console.log('err' + err);
      res.status(500).send(err);
    }
  }

}

exports.default = DoctorServices;