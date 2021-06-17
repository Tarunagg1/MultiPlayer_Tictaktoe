const otpSchema = require('../modals/otp');
const registerSchema = require('../modals/registration');
const jwt = require('jsonwebtoken');
const generateUniqueId = require('generate-unique-id');
const shortid = require('shortid');

const genrateAndSendOtp = async (number)=>{
    otp = Math.floor(Math.random() * (10000 - 10000 + 99999)) + 10000
    console.log(otp);
    const otpUserdata = await otpSchema.findOne({number})
    if(otpUserdata){
        await otpSchema.findOneAndUpdate({ number }, { otp })
    }else{
        const newotpSchema = new otpSchema({number,otp});
        await newotpSchema.save();
    }
    return;
}

const generateToken = async (payload)=>{
    const validationTOken = await jwt.sign(payload, process.env.LOGIN_SECRET);
    return validationTOken;
}

const registerUser = async (req,res)=>{
    const {number,name,email} = req.body;
    if(!number || !name || !email){
        return res.status(400).json({message:"All fields required",status:false});
    }  
    if(number.length < 10 || number.length > 10){
        return res.status(400).json({message:"Enter the valid number",status:false});
    }
    try {
        let id = generateUniqueId({
            useLetters: false,
            length: 8
        });
        
        id = "Akp" + id;
        const newregiser = await registerSchema({
            userid:id,
            name,
            email,
            number,
            username:name+shortid.generate()
        });
        
        const resp = await newregiser.save();
        // console.log(resp);

        if(resp){
            payload = {
                number:resp.number,
                islogintoken:true,
                _id:resp._id,
                name:resp.name
            }
            // console.log(payload);
            const authToken = await generateToken(payload);
            return res.status(200).json({message:"otp validate",status:true,authToken});
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).json({message:"Something went wrong",status:false,error});
    }
}

const sendOtp = async (req,res)=>{
    const {number} = req.body;
    if(!number){
        return res.status(400).json({message:"Number required",status:false});
    }
    if(number.length < 10 || number.length > 10){
        return res.status(400).json({message:"Enter the valid number",status:false});
    }
    try {
        await genrateAndSendOtp(number);
        return res.status(200).json({message:"Otp send Successfully",status:true});
    } catch (error) {
        return res.status(500).json({message:"Something went wrong",status:false,error});
    }
}

const verifyOtp = async (req,res)=>{
    const { otp,number } = req.body;
    if(!otp){
        return res.status(500).json({message:"Please Enter otp",status:false});
    }
   
    if (number) {
        if(number.length < 10 || number.length > 10){
            return res.status(400).json({message:"Enter the valid number",status:false});
        }
        try {
            const getdata = await otpSchema.findOne({ number,otp });
            if (getdata) {
                await otpSchema.findOneAndRemove({ number,otp});
                const getdataformdb = await registerSchema.findOne({number})
                if(getdataformdb){
                    payload = {
                        number:getdataformdb.number,
                        islogintoken:true,
                        _id:getdataformdb._id,
                        name:getdataformdb.name
                    }
                    const authToken = await generateToken(payload);
                    return res.status(200).json({message:"otp validate",status:true,authToken});
                }else{
                    return res.status(200).json({message:"otp validate",status:true,authToken:null});
                }
            } else {
                return res.status(500).json({message:"invalid otp",status:false});
            }
        } catch (error) {
            return res.status(500).json({message:"Something went wrong",status:false,error});
        }
    } else {
        return res.status(500).json({message:"number not provide",status:false});
    }
}



module.exports = {
    sendOtp,
    verifyOtp,
    registerUser
}
