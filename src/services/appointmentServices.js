const { AppointmentModel, PatientModel } = require("../models");
const Logger = require("../loaders/logger");
module.exports = class PescriptionService {
  constructor({ pateintId, doctorId, appointmentId, date } = {}) {
    this.pateintId = pateintId;
    this.doctorId = doctorId;
    this.appointmentId = appointmentId;
    this.date =
      Object.prototype.toString.call(date) === "[object Date]" || new Date();
  }
  book(patientId, callback) {
    const newAppointment = new AppointmentModel({
      doctor: this.doctorId,
      patient: patientId,
      time: this.date
    });
    newAppointment
      .save()
      .then(appointment => {
        PatientModel.findByIdAndUpdate(
          { _id: patientId },
          { $push: { appointment: appointment._id } }
        )
          .then(patient => callback(null, appointment))
          .catch(err => callback(err, null));
      })
      .catch(err => callback(err, null));
  }
  approve(doctorId, callback) {
    AppointmentModel.findById(this.appointmentId).then(appointment => {
      if (doctorId.toString() !== appointment.doctor.toString())
        return callback({ error: "not the same doctor" }, null);
      appointment.confirmed = true;
      return callback(
        null,
        `appointment 💉 with id ${appointment._id} for patient 🤒 with id ${
          appointment.patient
        } was confirmed for 📆 ${appointment.time.toString()}`
      );
    });
  }
  getAll(callback) {
    AppointmentModel.aggregate([
      { $sort: { time: 1 } },
      {
        $set: {
          open: {
            $gte: ["$time", this.date]
          }
        }
      },
      { $match: { open: true } },
      {
        $lookup: {
          from: "doctors",
          localField: "doctor",
          foreignField: "_id",
          as: "doctor"
        }
      },
      { $unwind: "$doctor" },
      {
        $lookup: {
          from: "patients",
          localField: "patient",
          foreignField: "_id",
          as: "patient"
        }
      },
      { $unwind: "$patient" },
      {
        $project: {
          "doctor.patient": 0,
          "doctor.pescriptions": 0,
          "doctor.patients": 0,
          "doctor.openingHour": 0,
          "doctor.closingHour": 0,
          "doctor.password": 0,
          "doctor.createdAt": 0,
          "doctor.updatedAt": 0,
          "patient.medicalRecord": 0,
          "patient.appointment": 0,
          "patient.createdAt": 0,
          "patient.updatedAt": 0,
          "patient.password": 0,
          open: 0
        }
      }
    ])
      .then(appointments => callback(null, appointments))
      .catch(err => callback(err, null));
  }
};
