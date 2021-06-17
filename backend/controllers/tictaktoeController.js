const tictaktoewinSchema = require('../modals/tictaktoe_win');

const addWinner = (req,res)=>{
    
    console.log(req.body);
    const {roomid,gameid,players,winnerid,gameamount} = req.body;
    
    if(!roomid || !gameid || !players || !winnerid || !gameamount){
        return res.status(400).json({message:"All fields required"})
    }else if(players.length <2 || players.length > 2){
        return res.status(400).json({message:"only 2 player allowed"})
    }
    try {
        const newWinner = new tictaktoewinSchema(req.body);
        newWinner.save();
        return res.status(200).json({message:"Winner added"})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

module.exports = {
    addWinner
}