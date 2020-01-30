  
import { Router } from 'express';
import middlewares from '../middlewares';
import bodyParser from 'body-parser';
import Pharmacy from '../../models/Pharmacy'
import PharmacyServices from '../../services/pharmacyServices'

const route = Router();

 const pharmacyRoute = (app) => {
  // app.use(bodyParser.urlencoded({
  //   extended: true
  // }));
  app.use(bodyParser.json());
  app.use('/pharmacy', route);
  route.get('/', (req, res)=> console.log('pharmacy route working'))
  route.post('/create',  async (req, res, next) => {
     try{
     // console.log("req body", req.body);
      const pharmacyInput = {...req.body}
      var servi = new PharmacyServices()
      servi.createPharmacy(pharmacyInput)
      .then(data => console.log(data, "aaaaaaaaaaaaaaaaaaaaa")) 
      return res.status(200);
     } 
     catch(err){
       next(err)
     }
  });
};


export default pharmacyRoute