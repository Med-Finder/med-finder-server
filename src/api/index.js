import { Router } from "express";
import phar from './routes/pharmacies'
export default () => {
   const app = Router();
    phar(app)
  // app.get('/', (req,res)=> console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeere"))
   return app;
};
