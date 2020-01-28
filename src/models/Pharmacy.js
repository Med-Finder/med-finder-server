const pharmacySchema = `CREATE TABLE IF NOT EXISTS pharmacy (
    pharmacyID SERIAL PRIMARY KEY UNIQUE NOT NULL,
    name VARCHAR(255)  ,
    adress VARCHAR(255) ,
    contact VARCHAR(255)  ,
    geoLocation VARCHAR(255) ,
    openingHours VARCHAR(255) ,
    feedbacks VARCHAR(255) ,
    medicine-id REFERENCES pharmacyMedicine(medicineID),
    );`;