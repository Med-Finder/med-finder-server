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

  route.post('/search',  async (req, res) => {
    let input = {...req.body}
    console.log(input)
    MedicineServicesInstance.searchMedicine(input.query)
     .then(data => res.json(data))
     .catch(err => console.log(err,"dddd"))
  })
};


export default medicineRoute