<<<<<<< HEAD
const mongoose = require("mongoose");
const searchable = require("mongoose-regex-search");
const Pharmacy = new mongoose.Schema(
  {
    name: { type: String, searchable: true },
    adress: { type: String, searchable: false },
    phoneNumber: String, //should be revised : structure wise
    latitude: Number,
    longitude: Number,
    openingHour: String,
    closingHour: String, //should be revised : stsructure wise
    feedbacks: String,
    email: String,
    password: String,
    medicines: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true } // should be tested
    ] //do we need this
  },
  { timestamps: true }
);
// should a pharmacy has it's own medicine table with all of the quantities
Pharmacy.plugin(searchable);
module.exports = mongoose.model("Pharmacy", Pharmacy);
=======
const pharmacySchema = `CREATE TABLE IF NOT EXISTS pharmacy (
    pharmacyID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(255)  ,
    adress VARCHAR(255) ,
    contact VARCHAR(255)  ,
    geoLocation VARCHAR(255) ,
    openingHours VARCHAR(255) ,
    feedbacks VARCHAR(255) ,
    medicine-id REFERENCES pharmacyMedicine(medicineID),
    );`;
>>>>>>> 82e10535c4ae38a73c389591b90652f3b57aa208
