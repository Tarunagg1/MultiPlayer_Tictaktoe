const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    number:{
        type:Number
    },
    otp:{
        type:String
    }
},{timestamp:true})


const otpmodal = mongoose.model('otp',otpSchema);

module.exports = otpmodal;
