const patientSchema = `CREATE TABLE IF NOT EXISTS patient (
    patientID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    firsName VARCHAR(255)  ,
    lastName VARCHAR(255)  ,
    password VARCHAR(255)   ,
    phoneNumber VARCHAR(255) ,
    email VARCHAR(255)   ,
    adress VARCHAR(255)  ,
    birthDate DATE   ,
    gender VARCHAR(255) ,
    geoLocation VARCHAR(255) ,
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