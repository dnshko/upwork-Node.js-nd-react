const mongoose = require('mongoose');

//const validator = require('validator');
var adminschema = new mongoose.Schema({

    mobile:{type: String}, 
email:{type: String},
password:{type: String},
session_token:{type:String}

})  

const Admin =  mongoose.model('Admin',adminschema);

module.exports= Admin;