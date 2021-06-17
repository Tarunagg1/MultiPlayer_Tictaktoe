const mongoose = require('mongoose');

const winnerSchema = mongoose.Schema({
    roomid:{
        type:String,
        required:true,
        unique:true
    },
    gameid:{
        type:String,
        required:true,
        unique:true
    },
    players:[
        {
            userid:{
                type:String,
                required:true
            },
            username:{
                type:String,
                required:true
            },
            iswinner:{
                type:Boolean
            }
        }
    ],
    winnerid:{
        type:String,
        required:true
    },
    gameamount:{
        type:Number,
        required:true
    }
},{timestamp:true})

const model = mongoose.model('tictaktoe',winnerSchema);

module.exports = model;


