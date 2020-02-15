const { AppointmentModel, PatientModel } = require("../models");
const Logger = require("../loaders/logger");
module.exports = class PescriptionService {
  constructor({ pateintId, doctorId, appointmentId, query } = {}) {
    this.pateintId = pateintId;
    this.doctorId = doctorId;
    this.appointmentId = appointmentId;
    this.query = query;
  }
  book(patientId, callback) {
    const newAppointment = new AppointmentModel({
      doctor: this.doctorId,
      patient: patientId,
      time: new Date()
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
      console.log(
        doctorId,
        appointment.doctor,
        doctorId.toString() !== appointment.doctor.toString()
      );
      if (doctorId.toString() !== appointment.doctor.toString()) {
        return callback({ error: "not the same doctor" }, null);
      }
      appointment.confirmed = true;
      return callback(
        null,
        `appointment 💉 with id ${appointment._id} for patient 🤒 with id ${
          appointment.patient
        } was confirmed for 📆 ${appointment.time.toString()}`
      );
    });
  }
};
