"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Doctor = _interopRequireDefault(require("./Doctor"));

var _MedicalRecord = _interopRequireDefault(require("./MedicalRecord"));

var _Medicines = _interopRequireDefault(require("./Medicines"));

var _Patient = _interopRequireDefault(require("./Patient"));

var _Pescription = _interopRequireDefault(require("./Pescription"));

var _Pharmacy = _interopRequireDefault(require("./Pharmacy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  DoctorModel: _Doctor.default,
  MedicalRecordModel: _MedicalRecord.default,
  MedicinesModel: _Medicines.default,
  PatientModel: _Patient.default,
  PescriptionModel: _Pescription.default,
  PharmacyModel: _Pharmacy.default
};
exports.default = _default;