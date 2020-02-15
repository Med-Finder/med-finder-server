const mongoose = require("mongoose");

const Appointment = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    pescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pescription"
    },
    time: Date
  },
  { timestamps: true }
);
module.exports = mongoose.model("Appointment", Appointment);
