const prescriptiontSchema = `CREATE TABLE IF NOT EXISTS prescriptiont (
    prescriptiontID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    dosage VARCHAR(255)  NOT NULL,
    schedule VARCHAR(255)  NOT NULL,
    doctorID REFERENCES doctor(doctorID)
    patientID REFERENCES patient(patientID),
    medicineID REFERENCES medicine(medicineID),
    );`;