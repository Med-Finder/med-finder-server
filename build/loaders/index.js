"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("./express.js"));

var _mongoose = _interopRequireDefault(require("./mongoose"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async ({
  expressApp
}) => {
  const mongoConnection = await (0, _mongoose.default)();

  _logger.default.info("✌️ DB loaded and connected!");

  const models = require("./../models");

  _logger.default.info("✌️ all model are loaded!");

  await (0, _express.default)({
    app: expressApp
  });

  _logger.default.info("✌️ Express loaded");
};

exports.default = _default;