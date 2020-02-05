module.exports = validateLogInInput = (req, res, next) => {
  switch (req.headers.headerstype) {
    case "patient":
    case "doctor":
    case "pharmacy":
      next();
      break;
    default:
      return res
        .status(400)
        .send(
          `not a valid request type 😯 choose either patient, doctor or pharmacie; you entered "${req.headers.headerstype}"`
        );
  }
};
