import Pharmacy from '../models/Pharmacy'

export default class PharmacyServices {
    constructor(pharmacy){
      pharmacy = new Pharmacy()
    }
    async createPharmacy(pharmacy){
        try {
            const newPharmacy = new Pharmacy({
              "name": pharmacy.name,
              "adress": pharmacy.adress,
              "phoneNumber": pharmacy.phoneNumber,
              "latitude": pharmacy.latitude,
              "longitude": pharmacy.longitude,
              "openingHour": pharmacy.openingHour,
              "closingHour": pharmacy.closingHour,
              "feedbacks": pharmacy.feedbacks,
              "password": pharmacy.password
          });
            
            let savedPharmacy = await newPharmacy.save(); //when fail its goes to catch
            console.log("pharmacy created in database in database"); //when successsss it print.
            return savedPharmacy
          } catch (err) {
            console.log('err' + err);
            res.status(500).send(err);
          }
    }
   async locatePharmacies(){
    var found = await  Pharmacy.find({})
    return found;
   }
   async searchPharmacies(query){
    var searchResult = await Pharmacy.search(query)
    return searchResult;
    }
   
}
