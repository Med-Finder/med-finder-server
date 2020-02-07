const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { PatientModel, DoctorModel, PharmacyModel } = require("./../models");
const { jwtSecret } = require("../config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      switch (jwt_payload.type) {
        case "patient":
          model = PatientModel;
          break;

        case "doctor":
          model = DoctorModel;
          break;
        case "pharmacy":
          model = PharmacyModel;
          break;
      }
      model
        .findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user, jwt_payload.type);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
