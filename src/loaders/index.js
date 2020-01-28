import expressLoader from "./express.js";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const models = require("./../models");
  Logger.info("✌️ all model are loaded!");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
