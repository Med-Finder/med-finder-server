const {DoctorModel} = require("../models");

module.exports  = class DoctorServices {
  
  async createDoctor(doctor) {
    try {
      const newDoctor = new DoctorModel({
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        speciality: doctor.speciality,
        email: doctor.email,
        image: doctor.image,
        lat: doctor.lat,
        lng: doctor.lng,
        openingHour: doctor.openingHour,
        closingHour: doctor.closingHour,
        password: doctor.password
      });

      let savedDoctor = await newDoctor.save(); //when fail its goes to catch
      console.log("doctor created in database "); //when successsss it print.
      return savedDoctor;
    } catch (err) {
      console.log("err" + err);
    }
  }
};


