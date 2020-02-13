module.exports = validateUserCoordinates = (req, res, next) => {
  const { lat, lng } = JSON.parse(req.headers["user-coordinates"]);

  // FIXME: changed this validation
  // if ((lng - 180) * (lng + 180) <= 0 && (lat - 90) * (lat + 90) <= 0) {
  if (Math.abs(lng) <= 180 && Math.abs(lat) <= 90) {
    console.log("emmmm delicious coordinates 😆");
    req.headers["user-coordinates"] = { lat, lng };
    next();
  } else {
    return res
      .status(400)
      .send(
        `not a valid cordinates, we resived ${lat} for Latitude and ${lng} for Longitude`
      );
  }
};
