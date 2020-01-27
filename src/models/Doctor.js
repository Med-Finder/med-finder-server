const doctorSchema = `CREATE TABLE IF NOT EXISTS doctor (
    doctorID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(255)  NOT NULL,
    speciality VARCHAR(255)  NOT NULL,
    geoLocation VARCHAR(255)  NOT NULL ,
    adress VARCHAR(255)  NOT NULL,
    email VARCHAR(255)   NOT NULL,
    patient-id REFERENCES patient-doctor(patientID),
    openingHours VARCHAR(255)  NOT NULL,
    expiringDay DATE NOT NULL,
    image VARCHAR(255)  NOT NULL,
    );`;