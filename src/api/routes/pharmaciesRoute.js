const { Router } = require("express");
const { validator } = require("../middlewares");
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
    return res.status(200);
  });
  // route.post("/searchtest/:query/:coordinates", (req, res, next) => {
  //   res.send(req.params);
  // });
  route.post(
    "/search/:query/:coordinates",
    validator.validateUserCoordinates,
    (req, res, next) => {
      pharmacyServicesInstance.searchPharmacies(
        req.params.query,
        req.params.coordinates,
        (err, data) => {
          if (err) {
            return res.send({ err });
          }
          return res.send(
            data.map(pharmacy => ({
              _id: pharmacy._id,
              name: pharmacy.name,
              coordinates: pharmacy.location.coordinates
            }))
          );
        }
      );
    }
  );

  // route.post("/search", validator.validateUserCoordinates, (req, res, next) => {
  //   let input = { ...req.body };
  //   console.log(input);
  //   pharmacyServicesInstance
  //     .searchPharmacies(input.query.toString(), req.headers["user-coordinates"])
  //     .then(data => {
  //       console.log(data);
  //       return res.send(
  //         data.map(pharmacy => {
  //           return {
  //             lat: pharmacy.lat,
  //             lng: pharmacy.lng,
  //             title: pharmacy.name
  //             // www: `https://www.Pharmacy-${pharmacy.name.slice(0, 5)}.com/` no need for this now
  //           };
  //         })
  //       );
  //     })
  //     .catch(err => console.log(err));
  // });

  route.post("/addMedicine", (req, res, next) => {
    let input = { ...req.body }; // has the pharmacy id and the med id
    console.log(input);
    pharmacyServicesInstance
      .addMedicines(input.pharmacyId, input.medicineId)
      .then(msg => res.send(msg))
      .catch(err => res.send(err));
  });
};

module.exports = pharmacyRoute;
