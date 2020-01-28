const medicalRecordSchema = `CREATE TABLE IF NOT EXISTS medicalRecord (
    medicalRecordID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    patientID REFERENCES patient(patientID),
    problems VARCHAR(255)  ,
    medications VARCHAR(255)   ,
    psychiatric VARCHAR(255) ,
    allergies VARCHAR(255)  ,
    );`;