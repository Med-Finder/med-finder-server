const { Router } = require("express");
const middlewares = require("../middlewares");
const bodyParser = require("body-parser");
const MedicineServices = require("../../services/medicineServices");

const route = Router();

const medicineRoute = app => {
  app.use("/medicine", route);
  route.get("/", (req, res) => console.log("medicine route working"));
  const MedicineServicesInstance = new MedicineServices();

  route.post("/save", async (req, res, next) => {
    // console.log("req body", req.body);
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

  route.post("/searchForPharmacyLocation", async (req, res) => {
    let input = { ...req.body };
    MedicineServicesInstance.getMedsLocations(input.query)
      .then(data => {
        var result = [];
        data.forEach(med => {
          med.pharmacyId.forEach(pharmacy => {
            result.push({
              lat: pharmacy.lat,
              lng: pharmacy.lng,
              label: pharmacy.name[0].toUpperCase(),
              draggable: false,
              title: "Pharmacy " + pharmacy.name,
              www: `https://www.Pharmacy-${pharmacy.name.slice(0, 5)}.com/`
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
