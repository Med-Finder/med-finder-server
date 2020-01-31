import { Router } from 'express';
import middlewares from '../middlewares';
import bodyParser from 'body-parser';
import MedicineServices from '../../services/medicineServices'

const route = Router();

 const medicineRoute = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use('/medicine', route);
  route.get('/', (req, res)=> console.log('medicine route working'))
  const  MedicineServicesInstance = new MedicineServices()
  
  route.post('/save',  async (req, res, next) => {
    
     // console.log("req body", req.body);
     const medicineInput = {...req.body}
        
     MedicineServicesInstance.createMedicine(medicineInput)
        .then(data => console.log(data, "\n medicine saved in database"))
        .catch(err => console.log( err,"lerrrrrrrrrrrrrrr")) 
        return res.status(200);
  });
};


export default medicineRoute