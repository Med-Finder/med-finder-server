const config = require("./config");

const express = require("express");

const Logger = require("./loaders/logger");

async function startServer() {
  const app = express();
  await require("./loaders")({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      //process.exit(1);
      return;
    }
    Logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️ 
        ################################################
      `);
  });
}

startServer();
