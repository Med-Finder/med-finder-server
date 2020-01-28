const prescriptionMedicineSchema = `CREATE TABLE IF NOT EXISTS prescriptionMedicineSchema (
    prescriptionMedicineID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    prescriptionID REFERENCES prescription(prescriptionID),
    medicineID REFERENCES medicine(medicineID),
    );`;