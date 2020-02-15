const { Router } = require("express");
const passport = require("passport");
const { pescriptionServices } = require("../../services");

const route = Router();
const pescriptionRoute = app => {
  app.use("/pescription", route);
  route.post(
    "/add",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      if (req.authInfo !== "doctor") {
        return res.status(400).send("not a doctor");
      }
      req.body.doctor = req.user._id;
      const newPescriptionServices = new pescriptionServices(req.body);
      newPescriptionServices.create((err, pescription) => {
        if (err) {
          return res.send(err);
        }
        return res.send(pescription);
      });
    }
  );
  route.get("/get/:id", (req, res) => {
    const newPescriptionServices = new pescriptionServices(req.params);
    newPescriptionServices.get((err, pescription) => {
      if (err) {
        return res.send(err);
      }
      return res.send(pescription);
    });
  });
};

module.exports = pescriptionRoute;
