const mongoose = require("mongoose");

const Pescription = new mongoose.Schema(
  {
    // makes no sense to me tbh
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
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    dosage: String, //should be revised : structure wise
    schedule: String //should be revised : structure wise
  },
  { timestamps: true }
);
// should a pharmacy has it's own medicine table with all of the quantities
module.exports = mongoose.model("Pescription", Pescription);
