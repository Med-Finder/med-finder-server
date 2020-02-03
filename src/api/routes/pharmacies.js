const { Router } = require("express");
// import middlewares from "../middlewares";
const bodyParser = require("body-parser");
const PharmacyServices = require("../../services/pharmacyServices");

const route = Router();

const pharmacyRoute = app => {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());
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
        var result = data.map(pharmacy => {
          return {
            lat: pharmacy.latitude,
            lng: pharmacy.longitude,
            label: pharmacy.name[0].toUpperCase(),
            draggable: false,
            title: "Pharmacy " + pharmacy.name,
            www: `https://www.Pharmacy-${pharmacy.name.slice(0, 5)}.com/`
          };
        });
        res.json(result);
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
        var result = data.map(pharmacy => {
          var obj = {};
          obj.lat = pharmacy.latitude;
          obj.lng = pharmacy.longitude;
          obj.label = pharmacy.name[0].toUpperCase();
          obj.draggable = false;
          obj.title = "Pharmacy " + pharmacy.name;
          obj.www = `https://www.Pharmacy-${pharmacy.name.slice(0, 5)}.com/`;
          return obj;
        });
        res.json(result);
      })
      .catch(err => console.log(err));
    return res.status(200);
  });
};

module.exports = pharmacyRoute;
