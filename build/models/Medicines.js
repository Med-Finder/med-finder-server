"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const searchable = require('mongoose-regex-search');

const Medicine = new _mongoose.default.Schema({
  name: {
    type: String,
    searchable: true,
    required: true
  },
  medicineClass: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  //should it be string or number
  administrationRoute: {
    type: String,
    required: true
  },
  dosageForm: {
    type: String,
    required: true
  },
  dosageschedule: {
    type: String,
    required: true
  },
  medicineUnit: {
    type: String,
    required: true
  },
  expiringDay: {
    type: Date,
    required: true
  },
  prescriptionStatus: {
    type: String,
    required: true
  },
  //should it be boolean  ?
  code: {
    type: String,
    required: true
  },
  warning: {
    type: String,
    required: true
  },
  sameAs: {
    type: String,
    required: true
  },
  //should be id ?
  quantity: {
    type: String,
    required: true
  },
  pharmacyId: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Pharmacy",
    required: true
  } // should be tested
  ]
}, {
  timestamps: true
});
Medicine.plugin(searchable);

var _default = _mongoose.default.model("Medicine", Medicine);

exports.default = _default;