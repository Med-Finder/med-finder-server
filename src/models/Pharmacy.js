const pharmacySchema = `CREATE TABLE IF NOT EXISTS pharmacy (
    pharmacyID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(255)  NOT NULL,
    adress VARCHAR(255)  NOT NULL ,
    contact VARCHAR(255)  NOT NULL,
    geoLocation VARCHAR(255)   NOT NULL,
    openingHours VARCHAR(255)   NOT NULL,
    feedbacks VARCHAR(255)   NOT NULL,
    medicine-id REFERENCES pharmacyMedicine(medicineID),
    );`;