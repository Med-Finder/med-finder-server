import mongoose from "mongoose";

const Pharmacy = new mongoose.Schema(
  {
    name: String,
    adress: String, //should be revised : structure wise
    phoneNumber: String, //should be revised : structure wise
    latitude: String,
    longitude:String,
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
export default mongoose.model("Pharmacy", Pharmacy);
