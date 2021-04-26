const mongoose = require('mongoose');

//const validator = require('validator');
var otpschema = new mongoose.Schema({
User:{type: String},
otp:{type: Number},
expireAt:{type:Date}




})  

const Otp =  mongoose.model('Otp',otpschema);

module.exports= Otp;