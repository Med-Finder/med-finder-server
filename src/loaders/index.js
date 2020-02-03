const expressLoader = require("./express.js");

const mongooseLoader = require("./mongoose");

const Logger = require("./logger");

module.exports = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const models = require("./../models");
  Logger.info("✌️ all model are loaded!");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
