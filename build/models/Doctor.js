"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Doctor = new _mongoose.default.Schema({
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
      if (!_validator.default.isEmail(value)) throw new Error({
        error: "Invalid Email adress"
      });
    }
  },
  image: String,
  latitude: String,
  longitude: String,
  openingHour: String,
  closingHour: String,
  password: {
    type: String,
    required: true
  },
  patients: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Patient"
  } // should we have this
  ]
}, {
  timestamps: true
});

var _default = _mongoose.default.model("Doctor", Doctor);

exports.default = _default;