import Pharmacy from '../models/Pharmacy'

export default class PharmacyServices {
    constructor(){

    }
    async createPharmacy(pharmacy){
        try {
            const newPharmacy = new Pharmacy({
              'name': newPharmacy.name,
              'adress' :newPharmacy.adress,
              'phoneNumber':newPharmacy.contact,
              'latitude':newPharmacy.latitude,
              'longitude':newPharmacy.longitude,
              'openingHours':newPharmacy.openingHours,
              'feedbacks':newPharmacy.feedbacks
            });
            console.log('before save');
            let savedPharmacy = await newPharmacy.save(); //when fail its goes to catch
            console.log(newPharmacy); //when success it print.
            console.log('after save');
          } catch (err) {
            console.log('err' + err);
            res.status(500).send(err);
          }
    }
}
