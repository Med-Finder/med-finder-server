const { Router } = require("express");
const { validator } = require("../middlewares");
const { medicineServices } = require("../../services");

const route = Router();

const medicineRoute = app => {
  app.use("/medicine", route);
  route.get("/", (req, res) => console.log("medicine route working"));
  const medicineServicesInstance = new medicineServices();

  route.post("/save", async (req, res, next) => {
    const medicineInput = { ...req.body };
    medicineServicesInstance
      .createMedicine(medicineInput)
      .then(data => console.log(data, "\n medicine saved in database"))
      .catch(err => console.log(err, "lerrrrrrrrrrrrrrr"));
    return res.status(200);
  });

  route.post("/search", async (req, res) => {
    let input = { ...req.body };
    console.log(input);
    medicineServicesInstance
      .searchMedicine(input.query)
      .then(data => res.json(data))
      .catch(err => console.log(err, "dddd"));
  });

  route.post("/searchForPharmacyLocation", async (req, res) => {
    let input = { ...req.body };
    return res.send(
      await medicineServicesInstance.getMedsLocations(input.query)
    );
    // var result = [];
    // data.forEach(med => {
    //   med.pharmacyId.forEach(pharmacy => {
    //     result.push({
    //       lat: pharmacy.lat,
    //       lng: pharmacy.lng,
    //       title: pharmacy.name
    //       // lat: pharmacy.lat,
    //       // lng: pharmacy.lng,
    //       // label: pharmacy.name[0].toUpperCase(),
    //       // draggable: false,
    //       // title: "Pharmacy " + pharmacy.name,
    //       // www: `https://www.Pharmacy-${pharmacy.name.slice(0, 5)}.com/`
    //     });
    //   });
    // });
    // res.json(result);
    // .catch(err => console.log(err))
  });

  route.get("/getAllMedicines", (req, res) => {
    medicineServicesInstance.getAllMedicines();

    return res.status(200);
  });

  route.post(
    "/search/:query/:coordinates",
    validator.validateUserCoordinates,
    (req, res, next) => {
      const newmedicineServices = new medicineServices(req.params.coordinates);
      newmedicineServices.searchMedicine(
        req.params.query,
        (err, pharmacies) => {
          if (err) return res.send({ err });
          return res.send(pharmacies);
        }
      );
    }
  );

  route.post("/addPharmacy", (req, res, next) => {
    let input = { ...req.body };
    console.log(input);
    medicineServicesInstance
      .addPharmacy(input.query, input.pharmacyId)
      .then(data => {
        console.log("pharmacy added with success", data);
        res.end(data);
      })
      .catch(err => console.log(err));
  });
};

module.exports = medicineRoute;
