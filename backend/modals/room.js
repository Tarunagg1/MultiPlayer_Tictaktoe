const mongoose = require('mongoose');

const roomsSchema = mongoose.Schema({
    roomid:{
        type:String
    },
    ourid:{
        type:String
    },
    gameid:{
        type:String
    },
    players:[
        {
            "playerid":{
                type:String
            },
            playername:{
                type:String
            }
        }
    ], 
    playerlimit:{
        type:Number
    },
    playercount:{
        type:Number,
        default:1
    },
    gamename:{
        type:String
    },
    roomstatus:{
        type:String
    },
    gameamount:{
        type:String
    }

},{timestamp:true})