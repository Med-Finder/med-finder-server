const Patient = require("../models/Patient");

module.exports = class PatientServices {
  async createPatient(patient) {
    try {
      const newPatient = new Patient({
        firstName: patient.firstName,
        lastName: patient.lastName,
        phoneNumber: patient.phoneNumber,
        email: patient.email,
        password: patient.password,
        adress: patient.adress,
        image: patient.image,
        birthDate: patient.birthDate,
        gender: patient.gender
      });

      let savedPatient = await newPatient.save(); //when fail its goes to catch
      console.log("patient created in database "); //when successsss it print.
      return savedPatient;
    } catch (err) {
      console.log("err" + err);
      res.status(500).send(err);
    }
  }
};
