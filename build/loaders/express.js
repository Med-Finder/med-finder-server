"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _api = _interopRequireDefault(require("../api"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  app
}) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.enable("trust proxy");
  app.use((0, _cors.default)());
  app.use(require("method-override")());
  app.use(_bodyParser.default.json());
  app.use(_config.default.api.prefix, (0, _api.default)());
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({
        message: err.message
      }).end();
    }

    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};

exports.default = _default;