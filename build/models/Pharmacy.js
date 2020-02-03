"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const searchable = require('mongoose-regex-search');

const Pharmacy = new _mongoose.default.Schema({
  name: {
    type: String,
    searchable: true
  },
  adress: {
    type: String,
    searchable: false
  },
  phoneNumber: String,
  //should be revised : structure wise
  latitude: String,
  longitude: String,
  openingHour: String,
  closingHour: String,
  //should be revised : stsructure wise
  feedbacks: String,
  email: String,
  password: String,
  medicines: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true
  } // should be tested
  ] //do we need this

}, {
  timestamps: true
}); // should a pharmacy has it's own medicine table with all of the quantities

Pharmacy.plugin(searchable);

var _default = _mongoose.default.model("Pharmacy", Pharmacy);

exports.default = _default;