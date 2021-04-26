const mongoose = require('mongoose');


var driverdetailsschema = new mongoose.Schema({
    driverId:{type:String},
driverName:{type: String},
truckNumber:{type: String},
dlNUmber:{type:String},
accountName:{type: String},
accountNumber:{type:Number},
bankName:{type: String},

ifscCode:{type: String},
bankBranch:{type: String},
sessionToken:{type: String},
dlPhoto:{type:String},
chequeImage:{type:String},
created_at:{type: Date},
updated_at:{type:Date}    



})  

const DriverDetails =  mongoose.model('DriverDetails',driverdetailsschema);

module.exports= DriverDetails;