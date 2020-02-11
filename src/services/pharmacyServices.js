const Pharmacy = require("../models/Pharmacy");
module.exports = class PharmacyServices {
  async createPharmacy(pharmacy) {
    try {
      const newPharmacy = new Pharmacy({
        name: pharmacy.name,
        address: pharmacy.address,
        phoneNumber: pharmacy.phoneNumber,
        // lat: pharmacy.lat,
        // lng: pharmacy.lng,
        location: pharmacy.location,
        openingHour: pharmacy.openingHour,
        closingHour: pharmacy.closingHour,
        feedbacks: pharmacy.feedbacks,
        password: pharmacy.password
      });

      let savedPharmacy = await newPharmacy.save(); //when fail its goes to catch
      console.log("pharmacy created in database in database"); //when successsss it print.
      return savedPharmacy;
    } catch (err) {
      console.log("err" + err);
      res.status(500).send(err);
    }
  }
  async locatePharmacies() {
    var found = await Pharmacy.find({});
    return found;
  }
  searchPharmaciestest(query, userCoordinates, callback) {
    console.log(userCoordinates.lng, userCoordinates.lat);
    // Pharmacy.search(query)
    Pharmacy.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [userCoordinates.lng, userCoordinates.lat]
          }
          // $maxDistance: 1 // in meter
        }
      }
    })
      .then(data => callback(null, data))
      .catch(err => callback(err, null));
  }

  async searchPharmacies(query, userCoordinates) {
    try {
      console.log(query, userCoordinates);
      var searchResult = await Pharmacy.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [userCoordinates.lng, userCoordinates.lat]
            },
            $maxDistance: 10000 // in meter
          }
        }
      })
        // .search(query)
        .populate({
          path: "medicines"
        })
        .lean();
      searchResult = searchResult.filter(
        pharmacy =>
          pharmacy.openingHour < new Date().getHours() &&
          pharmacy.closingHour > new Date().getHours()
      );
      return searchResult;
    } catch (e) {
      return e;
    }
  }
  async addMedicines(query, med) {
    var searchResult = await Pharmacy.search(query)
      .then(data => {
        console.log(data[0].medicines, "helloooooo");
        data[0].medicines.push(med);
        data[0].save();
        console.log(data);
      })
      .catch(err => console.log(err, "error updating med"));
  }
};
