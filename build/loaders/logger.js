"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transports = [];

if (process.env.NODE_ENV !== "development") {
  transports.push(new _winston.default.transports.Console());
} else {
  transports.push(new _winston.default.transports.Console({
    format: _winston.default.format.combine(_winston.default.format.cli(), _winston.default.format.splat())
  }));
}

const LoggerInstance = _winston.default.createLogger({
  level: _config.default.logs.level,
  levels: _winston.default.config.npm.levels,
  format: _winston.default.format.combine(_winston.default.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss"
  }), _winston.default.format.errors({
    stack: true
  }), _winston.default.format.splat(), _winston.default.format.json()),
  transports
});

var _default = LoggerInstance;
exports.default = _default;