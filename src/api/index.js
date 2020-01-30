import { Router } from "express";
import pharmacyRoute from './routes/pharmacies'
export default () => {
   const app = Router();
   console.log("rooooute is getting here")
   pharmacyRoute(app)
    return app;
};
