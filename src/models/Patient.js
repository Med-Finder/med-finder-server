const mongoose = require("mongoose");
const validator = require("validator");

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

    phoneNumber: String, // should it be required ?

    email: {
      type: String,
      lowercase: true,
      unique: true,
      validate: value => {
        if (!validator.isEmail(value))
          throw new Error({ error: "Invalid Email address" });
      }
    },

    password: { type: String, required: true },

    address: String, //should be revised

    image: String, //should be revised

    birthDate: String,

    gender: String, //we can add a validator here

    medicalRecord: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicalRecord"
      }
    ],
    doctors: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" } // should we have this
    ],
    // medicines: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" } // should be tested
    // ],
    pescriptions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Pescription" } // should we have this
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", Patient);
