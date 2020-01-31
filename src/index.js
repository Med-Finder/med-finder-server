import config from "./config";

import express from "express";

import Logger from "./loaders/logger";

import("@babel/register");
import("@babel/polyfill");

async function startServer() {
  const app = express();
  await require("./loaders").default({ expressApp: app });
 
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
