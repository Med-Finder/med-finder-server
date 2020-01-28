const pharmacyMedicineSchema = `CREATE TABLE IF NOT EXISTS pharmacyMedicine (
    pharmacyMedicineID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    pharmacyID REFERENCES pharmacy(pharmacyID),
    medicineID REFERENCES medicine(medicineID),
    );`;