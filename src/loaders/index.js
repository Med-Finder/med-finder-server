import expressLoader from "./express.js";
import Logger from "./logger";
import db from './postgres'


export default async ({ expressApp }) => {
 
  db.connect()
  .then(() => console.log(' database connected'))
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
