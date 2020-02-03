"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Patient = _interopRequireDefault(require("../models/Patient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PatientServices {
  constructor(patient) {
    patient = new _Patient.default();
  }

  async createPatient(patient) {
    try {
      const newPatient = new _Patient.default({
        "firstName": patient.firstName,
        "lastName": patient.lastName,
        "phoneNumber": patient.phoneNumber,
        "email": patient.email,
        "password": patient.password,
        "adress": patient.adress,
        "image": patient.image,
        "birthDate": patient.birthDate,
        "gender": patient.gender
      });
      let savedPatient = await newPatient.save(); //when fail its goes to catch

      console.log("patient created in database "); //when successsss it print.

      return savedPatient;
    } catch (err) {
      console.log('err' + err);
      res.status(500).send(err);
    }
  }

}

exports.default = PatientServices;