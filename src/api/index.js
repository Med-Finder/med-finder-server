import { Router } from "express";
import pharmacyRoute from './routes/pharmacies'
import patientRoute from './routes/patients'
import doctorRoute from './routes/doctor'
import medicineRoute from './routes/medicines'
export default () => {
   const app = Router();
   pharmacyRoute(app)
   patientRoute(app)
   doctorRoute(app)
   medicineRoute(app)
    return app;
};
