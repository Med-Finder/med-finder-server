const { Router } = require("express");
const { validator } = require("../middlewares");
const { doctorServices } = require("../../services");

const route = Router();

const doctorRoute = app => {
  app.use("/doctor", route);

  route.get("/", (req, res) => console.log("\n doctor route working"));

  route.get(
    "/search/:query/:coordinates/:distance",
    validator.validateUserCoordinates,
    (req, res) => {
      const newDoctorServices = new doctorServices(req.params);
      newDoctorServices.searchDoctor((err, doctors) => {
        if (err) return res.send({ err });
        return res.send(
          doctors.map(doctor => ({
            _id: doctor._id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            email: doctor.email,
            speciality: doctor.speciality,
            coordinates: doctor.location.coordinates
          }))
        );
      });
    }
  );
};

module.exports = doctorRoute;
