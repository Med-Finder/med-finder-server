  
import { Router } from 'express';
import middlewares from '../middlewares';
const route = Router();

 const pharmacyRoute = (app) => {
  app.use('/users', route);
  route.get('/',  async (req, res, next) => {
     try{
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      return res.status(200);
     } 
     catch(err){
       next(err)
     }
  });
};


export default pharmacyRoute