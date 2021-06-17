const route = require('express').Router();
const authController = require('../controllers/authController');

route.get('/',(req,res)=>{
    res.send("ijuh")
});

route.post('/sendotp',authController.sendOtp);
route.post('/verifyotp',authController.verifyOtp);
route.post('/registeruser',authController.registerUser);


module.exports = route;