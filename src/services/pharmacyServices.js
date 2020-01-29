import Pharmacy from '../models/Pharmacy'

export default class PharmacyServices {
    constructor(){

    }
    async createPharmacy(pharmacy){
        try {
            const newPharmacy = new Pharmacy({
              'name': newPharmacy.name,
              'adress' :newPharmacy.adress,
              'contact':newPharmacy.contact,
              'geoLocation':newPharmacy.geoLocation,
              'openingHours':newPharmacy.openingHours,
              'feedbacks':newPharmacy.feedbacks
            });
            console.log('before save');
            let saveUser = await newUser.save(); //when fail its goes to catch
            console.log(saveUser); //when success it print.
            console.log('after save');
          } catch (err) {
            console.log('err' + err);
            res.status(500).send(err);
          }
    }
}
