import { Router } from "express";
import pharmacyRoute from "./routes/pharmacies";

export default () => {
  const app = Router();
  pharmacyRoute(app);
  return app;
};
