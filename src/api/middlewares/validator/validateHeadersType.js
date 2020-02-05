module.exports = validateLogInInput = (req, res, next) => {
  const header = req.headers.headerstype;
  if (header === "patient" || header === "doctor" || header === "pharmacy") {
    next();
  } else {
    return res
      .status(400)
      .send(
        `not a valid request type 😯 choose either patient, doctor or pharmacie; you entered "${header}"`
      );
  }
};
