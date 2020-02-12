const mongoose = require("mongoose");
const Pharmacy = new mongoose.Schema(
  {
    name: { type: String, searchable: true },
    address: { type: String, searchable: false },
    phoneNumber: String, //should be revised : structure wise
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    // latitude: Number,
    // longitude: Number,
    openingHour: Number,
    closingHour: Number, //should be revised : structure wise
    feedbacks: String,
    email: String,
    password: String,
    medicines: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true } // should be tested
    ] //do we need this
  },
  { timestamps: true },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true }
  }
);
// should a Pharmacy has it's own medicine table with all of the quantities ?
Pharmacy.index({ location: "2dsphere" });

module.exports = mongoose.model("Pharmacy", Pharmacy);
