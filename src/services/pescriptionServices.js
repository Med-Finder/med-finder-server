const { PescriptionModel, DoctorModel, PatientModel } = require("../models");
const Logger = require("../loaders/logger");

module.exports = class PescriptionService {
  constructor({ id, doctor, patient, medicines } = {}) {
    this.id = id;
    this.doctor = doctor;
    this.patient = patient;
    this.medicines = medicines;
  }
  create(callback) {
    const newPescription = new PescriptionModel({
      doctor: this.doctor,
      patient: this.patient,
      medicines: this.medicines
    });
    newPescription
      .save()
      .then(async pescription => {
        await DoctorModel.findOneAndUpdate(
          { _id: this.doctor },
          { $push: { pescriptions: pescription._id } }
        );
        await PatientModel.findOneAndUpdate(
          { _id: this.patient },
          { $push: { pescriptions: pescription._id } }
        );
        return callback(null, pescription);
      })
      .catch(err => callback(err, null));
  }
  get(callback) {
    PescriptionModel.findById(this.id)
      .populate("doctor")
      .populate("patient")
      .populate("medicines.medicine")
      .then(pescription => {
        callback(null, pescription);
      })
      .catch(err => callback(err, null));
  }
};
