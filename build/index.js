"use strict";

var _config = _interopRequireDefault(require("./config"));

var _express = _interopRequireDefault(require("express"));

var _logger = _interopRequireDefault(require("./loaders/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

Promise.resolve().then(() => _interopRequireWildcard(require("@babel/register")));
Promise.resolve().then(() => _interopRequireWildcard(require("@babel/polyfill")));

async function startServer() {
  const app = (0, _express.default)();
  await require("./loaders").default({
    expressApp: app
  });
  app.listen(_config.default.port, err => {
    if (err) {
      _logger.default.error(err); //process.exit(1);


      return;
    }

    _logger.default.info(`
        ################################################
        🛡️  Server listening on port: ${_config.default.port} 🛡️ 
        ################################################
      `);
  });
}

startServer();