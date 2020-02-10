const { Router } = require("express");
// import middlewares from "../middlewares";
const PharmacyServices = require("../../services/pharmacyServices");

const route = Router();

const pharmacyRoute = app => {
  app.use("/pharmacy", route);
  route.get("/", (req, res) => console.log("pharmacy route working"));
  const pharmacyServicesInstance = new PharmacyServices();

  route.post("/create", async (req, res, next) => {
    // console.log("req body", req.body);
    const pharmacyInput = { ...req.body };

    pharmacyServicesInstance
      .createPharmacy(pharmacyInput)
      .then(data => console.log(data, "created pharmacy"))
      .catch(err => console.log(err));
    return res.status(200);
  });

  route.get("/locateAllPharmacies", async (req, res, next) => {
    console.log("locate pharmacy route");
    pharmacyServicesInstance
      .locatePharmacies()
      .then(data => {
        return res.send(
          data.map(pharmacy => {
            return {
              lat: pharmacy.lat,
              lng: pharmacy.lng,
              label: pharmacy.name[0].toUpperCase(),
              draggable: false,
              title: "Pharmacy " + pharmacy.name,
              www: `https://www.Pharmacy-${pharmacy.name.slice(0, 5)}.com/`
            };
          })
        );
      })
      .catch(err => console.log(err));
    return res.status(200);
  });

  route.post("/search", async (req, res, next) => {
    let input = { ...req.body };
    console.log(input);
    pharmacyServicesInstance
      .searchPharmacies(input.query.toString())
      .then(data => {
        res.send(
          data.map(pharmacy => {
            return {
              lat: pharmacy.lat,
              lng: pharmacy.lng,
              title: pharmacy.name
              // www: `https://www.Pharmacy-${pharmacy.name.slice(0, 5)}.com/` no need for this now
            };
          })
        );
      })
      .catch(err => console.log(err));
  });

  route.post("/addMedicine", async (req, res, next) => {
    let input = { ...req.body };
    console.log(input);
    pharmacyServicesInstance
      .addMedicines(input.query, input.medicine)
      .then(data => {
        console.log("medicine added with success", data);
      })
      .catch(err => console.log(err));
  });
};

module.exports = pharmacyRoute;
