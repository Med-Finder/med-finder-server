const doctorSchema = `CREATE TABLE IF NOT EXISTS doctor (
    doctorID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(255)  ,
    speciality VARCHAR(255)  ,
    geoLocation VARCHAR(255)   ,
    adress VARCHAR(255)  ,
    email VARCHAR(255)   ,
    patient-id REFERENCES patient-doctor(patientID),
    openingHours VARCHAR(255),
    expiringDay DATE ,
    image VARCHAR(255) ,
    );`;

 
    
