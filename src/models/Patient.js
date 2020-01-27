const patientSchema = `CREATE TABLE IF NOT EXISTS patient (
    patientID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    firsName VARCHAR(255)  NOT NULL,
    lastName VARCHAR(255)  NOT NULL,
    password VARCHAR(255)  NOT NULL ,
    phoneNumber VARCHAR(255)  NOT NULL,
    email VARCHAR(255)   NOT NULL,
    adress VARCHAR(255)  NOT NULL,
    birthDate DATE   NOT NULL,
    gender VARCHAR(255)  NOT NULL,
    geoLocation VARCHAR(255)  NOT NULL,
    image  VARCHAR(255),
    medicalRecordID REFERENCES medicalRecord(medicalRecordID)
    doctor-id REFERENCES patientDactor(doctorID),
    );`;

// conn.query(userSchema, (err, data) => {
//   if (err) console.error(err);
//   else console.log("Created User Table");
// });

//User functionality

// function getUser(username) {
//   return conn.query(`SELECT * FROM users WHERE username = $1`, [username]);
// }

// function createUser(username, password) {
//   return conn.query(`INSERT into users(username, password) VALUES($1, $2)`, [
//     username,
//     password
//   ]);
// }

// module.exports.find = getUser;