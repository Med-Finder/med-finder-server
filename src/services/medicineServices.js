import Medicine from '../models/Medicines'

export default class MedicineServices {
    constructor(medicine){
        medicine = new Medicine()
    }
    async createMedicine(medicine){
        try {
            const newMedicine = new Medicine({
              "name": medicine.name,
              "medicineClass": medicine.medicineClass,
              "cost": medicine.cost,
              "administrationRoute": medicine.administrationRoute,
              "dosageForm": medicine.dosageForm,
              "dosageschedule": medicine.dosageschedule,
              "medicineUnit": medicine.medicineUnit,
              "expiringDay": medicine.expiringDay,
              "prescriptionStatus": medicine.prescriptionStatus,
              "code": medicine.code,
              "warning": medicine.warning,
              "sameAs": medicine.sameAs,
              "quantity": medicine.quantity,
          });
            
            let savedMedicine = await newMedicine.save() //when fail its goes to catch
            console.log("medecine saved in database "); //when successsss it print.
            return savedMedicine;
          } 
            catch (err) {
            console.log('err' + err);
            res.status(500).send(err);
          }
    }
    async searchMedicine(query){
        try{
        var searchResult = await Medicine.search(query)
        return searchResult;
        }
        catch(err){
            console.log(err)
            res.status(500).send(err);
        }
    }
}