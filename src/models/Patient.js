import mongoose from "mongoose";
import validator from "validator";

const Patient = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter a valid first name"]
    },

    lastName: {
      type: String,
      required: [true, "Please enter a valid last name"]
    },

    password: { type: String, required: true },

    phoneNumber: String, // should it be required ?

    email: {
      type: String,
      lowercase: true,
      unique: true,
      validate: value => {
        if (!validator.isEmail(value))
          throw new Error({ error: "Invalid Email adress" });
      }
    },

    adress: String, //should be revised

    image: String, //should be revised

    birthDate: String,

    gender: String, //we can add a validator here

    medicalRecord: {
      type: Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true
    } // should we have this
  },
  { timestamps: true }
);

export default mongoose.model("Patient", Patient);
