"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Pescription = new _mongoose.default.Schema({
  // makes no sense to me tbh
  doctor: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  patient: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  medicine: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  dosage: String,
  //should be revised : structure wise
  schedule: String //should be revised : structure wise

}, {
  timestamps: true
}); // should a pharmacy has it's own medicine table with all of the quantities

var _default = _mongoose.default.model("Pescription", Pescription);

exports.default = _default;