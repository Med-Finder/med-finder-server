const { Router } = require("express");
const { validator } = require("../middlewares");
const bodyParser = require("body-parser");
const MedicineServices = require("../../services/medicineServices");

const route = Router();

const medicineRoute = app => {
  app.use("/medicine", route);
  route.get("/", (req, res) => console.log("medicine route working"));
  const MedicineServicesInstance = new MedicineServices();

  route.post("/save", async (req, res, next) => {
    const medicineInput = { ...req.body };
    MedicineServicesInstance.createMedicine(medicineInput)
      .then(data => console.log(data, "\n medicine saved in database"))
      .catch(err => console.log(err, "lerrrrrrrrrrrrrrr"));
    return res.status(200);
  });

  route.post("/search", async (req, res) => {
    let input = { ...req.body };
    console.log(input);
    MedicineServicesInstance.searchMedicine(input.query)
      .then(data => res.json(data))
      .catch(err => console.log(err, "dddd"));
  });

  route.post("/searchForPharmacyLocation", validator.validateUserCoordinates, async (req, res) => {
    let input = { ...req.body };
    // FIXME: changed this. Added coordinates from header
    MedicineServicesInstance.getMedsLocations(
      input.query,
      req.headers["user-coordinates"])
      .then(data => {
        var result = [];
        data.forEach(med => {
          med.pharmacyId.forEach(pharmacy => {
            result.push({
              lat: pharmacy.location.coordinates[1],
              lng: pharmacy.location.coordinates[0],
              title: pharmacy.name
            });
          });
        });
        res.json(result);
      })

      .catch(err => console.log(err));
  });

  route.get("/getAllMedicines", (req, res) => {
    MedicineServicesInstance.getAllMedicines();

    return res.status(200);
  });

  route.post("/addPharmacy", async (req, res, next) => {
    let input = { ...req.body };
    console.log(input);
    MedicineServicesInstance.addPharmacy(input.query, input.pharmacyId)
      .then(data => {
        console.log("pharmacy added with success", data);
        res.end(data);
      })
      .catch(err => console.log(err));
  });
};

module.exports = medicineRoute;
