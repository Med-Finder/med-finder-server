import Doctor from '../models/Doctor'

export default class DoctorServices {
    constructor(doctor){
        doctor = new Doctor()
    }
    async createDoctor(doctor){
        try {
            const newDoctor = new Doctor({
              "name": doctor.name,
              "speciality": doctor.speciality,
              "email": doctor.email,
              "image": doctor.image,
              "latitude": doctor.latitude,
              "longitude": doctor.longitude,
              "openingHour": doctor.openingHour,
              "closingHour": doctor.closingHour,
              "password": doctor.password
          });
            
            let savedDoctor = await newDoctor.save(); //when fail its goes to catch
            console.log("doctor created in database "); //when successsss it print.
            return savedDoctor;
          } 
            catch (err) {
            console.log('err' + err);
            res.status(500).send(err);
          }
    }
}