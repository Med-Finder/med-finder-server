const mongoose = require("mongoose");

const validator = require("validator");

const Doctor = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter a first name"]
    },
    lastName: {
      type: String,
      required: [true, "Please enter a last name"]
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
          throw new Error({ error: "Invalid Email address" });
      }
    },

    image: String,

    lat: Number,

    lng: Number,

    openingHour: String,

    closingHour: String,

    password: { type: String, required: true },
    patients: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Patient" } // should we have this
    ],
    pescriptions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Pescription" } // should we have this
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", Doctor);
