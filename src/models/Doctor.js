import mongoose from "mongoose";
import validator from "validator";

const Doctor = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"]
    },

    speciality: {
      // are we going to have a speciality table ?
      type: String,
      required: [true, "Please enter a valid speciality"]
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      validate: value => {
        if (!validator.isEmail(value))
          throw new Error({ error: "Invalid Email adress" });
      }
    },

    image: String,

    latitude: String,
    
    longitude:String, 

    openingHour: String, 
    
    closingHour: String, 
    
    password: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", Doctor);
