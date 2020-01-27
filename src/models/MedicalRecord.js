const medicalRecordSchema = `CREATE TABLE IF NOT EXISTS medicalRecord (
    medicalRecordID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    patientID REFERENCES patient(patientID),
    problems VARCHAR(255)  NOT NULL,
    medications VARCHAR(255)  NOT NULL ,
    psychiatric VARCHAR(255)  NOT NULL,
    allergies VARCHAR(255)   NOT NULL,
    );`;