const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    userid:{
        type:String,
        trim:true,
        unique:true
    },
    name:{
        type:String,
        trim:true
    },
    username:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    number:{
        type:Number,
        trim:true,
        unique:true
    }
},{timestamp:true})

const registrationmodel = mongoose.model('register',registrationSchema);

module.exports = registrationmodel;