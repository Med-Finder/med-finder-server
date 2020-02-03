"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Patient = new _mongoose.default.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter a valid first name"]
  },
  lastName: {
    type: String,
    required: [true, "Please enter a valid last name"]
  },
  phoneNumber: String,
  // should it be required ?
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
  password: {
    type: String,
    required: true
  },
  adress: String,
  //should be revised
  image: String,
  //should be revised
  birthDate: String,
  gender: String,
  //we can add a validator here
  medicalRecord: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "MedicalRecord"
  }],
  doctors: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Doctor"
  } // should we have this
  ],
  medicines: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Medicine"
  } // should be tested
  ]
}, {
  timestamps: true
});

var _default = _mongoose.default.model("Patient", Patient);

exports.default = _default;