"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MedicalRecord = new _mongoose.default.Schema({
  patient: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  problems: String,
  //should be revised : structure wise
  medications: String,
  //should be revised : structure wise
  psychiatric: String,
  //should be revised : structure wise
  allergirs: String //should be revised : structure wise

}, {
  timestamps: true
});

var _default = _mongoose.default.model("MedicalRecord", MedicalRecord);

exports.default = _default;