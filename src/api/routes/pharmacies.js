  
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
  const  pharmacyServicesInstance = new PharmacyServices()
  
  route.post('/create',  async (req, res, next) => {
    
     // console.log("req body", req.body);
     const pharmacyInput = {...req.body}
        
        pharmacyServicesInstance.createPharmacy(pharmacyInput)
        .then(data => console.log(data, "created pharmacy"))
        .catch(err => console.log(err)) 
        return res.status(200);
  });

  route.get('/locateAllPharmacies',  async (req, res, next) => {
    console.log("locate pharmacy route")
       pharmacyServicesInstance.locatePharmacies()
       .then(data => console.log(data, "located pharmacies")) 
       .catch(err => console.log(err))
       return res.status(200); 
 });

 route.post('/search',  async (req, res, next) => {
    let input = {...req.body}
    console.log(input)
     pharmacyServicesInstance.searchPharmacies(input.query)
     .then(data => console.log(data, "search result pharmacies")) 
     .catch(err => console.log(err))
     return res.status(200); 
});
};


export default pharmacyRoute