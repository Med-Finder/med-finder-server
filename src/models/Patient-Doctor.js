const patientDactorSchema = `CREATE TABLE IF NOT EXISTS prescriptionMedicineSchema (
    patientDactorID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    patientID REFERENCES patient(patientID),
    doctorID REFERENCES doctor(doctorID),
    );`;