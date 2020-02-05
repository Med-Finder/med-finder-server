const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { PatientModel } = require("./../models");
const { jwtSecret } = require("../config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      PatientModel.findById(jwt_payload.id)
        .then(patient => {
          if (patient) {
            return done(null, patient);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
