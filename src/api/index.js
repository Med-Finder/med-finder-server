import { Router } from "express";
import pharmacyRoute from './routes/pharmacies'
import patientRoute from './routes/patients'
import doctorRoute from './routes/doctor'
export default () => {
   const app = Router();
   pharmacyRoute(app)
   patientRoute(app)
   doctorRoute(app)
    return app;
};
