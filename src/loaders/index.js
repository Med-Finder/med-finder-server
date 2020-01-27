import expressLoader from "./express.js";
import Logger from "./logger";
var pg = require('pg');
var conString = "postgres://postgres:123456@localhost:5000/medfinder";

export default async ({ expressApp }) => {
  var db = new pg.Client(conString);
  db
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))
  
 // Logger.info("✌️ DB loaded and connected!");

  //   const userModel = {
  //     name: 'userModel',
  //     // Notice the require syntax and the '.default'
  //     model: require('../models/user').default,
  //   };

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
