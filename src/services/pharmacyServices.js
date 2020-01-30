import Pharmacy from '../models/Pharmacy'
var pharmacy = new Pharmacy()
export default class PharmacyServices {
    constructor(pharmacy){}
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
            console.log('before save');
               let savedPharmacy = await newPharmacy.save(); //when fail its goes to catch
            console.log(savedPharmacy, "saved in database"); //when successsss it print.
            return newPharmacy
            console.log('after save');
          } catch (err) {
            console.log('err' + err);
            res.status(500).send(err);
          }
    }
}
