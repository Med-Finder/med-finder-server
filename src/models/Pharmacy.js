const mongoose = require("mongoose");
const searchable = require("mongoose-regex-search");
const Pharmacy = new mongoose.Schema(
  {
    name: { type: String, searchable: true },
    address: { type: String, searchable: false },
    phoneNumber: String, //should be revised : structure wise
    latitude: Number,
    longitude: Number,
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
// should a pharmacy has it's own medicine table with all of the quantities ?
Pharmacy.plugin(searchable);
module.exports = mongoose.model("Pharmacy", Pharmacy);
