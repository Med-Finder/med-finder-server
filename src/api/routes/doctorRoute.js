const { Router } = require("express");
const { validator } = require("../middlewares");
const DoctorServices = require("../../services/doctorServices");

const route = Router();

const doctorRoute = app => {
  app.use("/doctor", route);

  route.get("/", (req, res) => console.log("\n doctor route working"));

  route.post("/register", async (req, res, next) => {
    // const doctorInput = { ...req.body };
    // doctorServicesInstance
    //   .createDoctor(doctorInput)
    //   .then(data => console.log(data, "created doctor"))
    //   .catch(err => console.log(err));
    // return res.status(200);
  });
  route.post(
    "/search/:query/:coordinates",
    validator.validateUserCoordinates,
    (req, res, next) => {
      const newDoctorServices = new DoctorServices(req.params.coordinates);
      newDoctorServices.searchDoctor(req.params.query, (err, doctors) => {
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
