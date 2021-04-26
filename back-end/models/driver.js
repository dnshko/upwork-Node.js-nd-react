const mongoose = require('mongoose');

//const validator = require('validator');
var driverschema = new mongoose.Schema({
mobile:{type: String},
isVerified:{type: Boolean},
hasSubmittedDetails:{type: Boolean},
created_at:{type:Date},
token:{type:String}  



})  

const Driver =  mongoose.model('Driver',driverschema);

module.exports= Driver;