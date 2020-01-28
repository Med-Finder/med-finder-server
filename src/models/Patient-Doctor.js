const patientDactorSchema = `CREATE TABLE IF NOT EXISTS patientDactor (
    patientDactorID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    patientID REFERENCES patient(patientID),
    doctorID REFERENCES doctor(doctorID),
    );`;