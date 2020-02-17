const mongoose = require("mongoose");

const Pescription = new mongoose.Schema(
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
    medicines: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
          required: true
        },
        dosage: String, //should be revised : structure wise
        schedule: String //should be revised : structure wise
      }
    ]
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pescription", Pescription);
