import mongoose from "mongoose";

const Pharmacy = new mongoose.Schema(
  {
    name: String,
    adress: String, //should be revised : structure wise
    contact: String, //should be revised : structure wise
    geoLocation: String, //should be revised : structure wise
    openingHours: String, //should be revised : structure wise
    feedbacks: String //do we need this
  },
  { timestamps: true }
);
// should a pharmacy has it's own medicine table with all of the quantities
export default mongoose.model("Pharmacy", Pharmacy);
