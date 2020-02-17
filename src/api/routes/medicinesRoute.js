const { Router } = require("express");
const { validator } = require("../middlewares");
const { medicineServices } = require("../../services");

const route = Router();

const medicineRoute = app => {
  app.use("/medicine", route);
  route.get("/", (req, res) => console.log("medicine route working"));
  const medicineServicesInstance = new medicineServices();

  route.get(
    "/search/:query/:coordinates/:distance",
    validator.validateUserCoordinates,
    (req, res) => {
      const newMedicineServices = new medicineServices(req.params);
      newMedicineServices.searchMedicine((err, pharmacies) => {
        if (err) return res.send({ err });
        return res.send(pharmacies);
      });
    }
  );

  route.post("/save", async (req, res) => {
    const newMedicineServices = new medicineServices(req.body);
    newMedicineServices
      .createMedicine()
      .then(data =>
        data.errors
          ? res.send({ success: false, data })
          : res.send({ success: true, data })
      );
  });
};

module.exports = medicineRoute;
