import { Router } from "express";
import pharmacyRoute from './routes/pharmacies'
import patientRoute from './routes/patients'
export default () => {
   const app = Router();
   pharmacyRoute(app)
   patientRoute(app)
    return app;
};
