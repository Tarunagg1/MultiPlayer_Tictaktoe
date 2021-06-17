const route = require('express').Router();
const toctaktoeController = require('../controllers/tictaktoeController');

route.get('/',(req,res)=>{
    res.send("ijuh")
});

route.post('/',toctaktoeController.addWinner);


module.exports = route;