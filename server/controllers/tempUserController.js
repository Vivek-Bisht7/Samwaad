const TempUser = require('../models/tempUser');
const bcrypt = require('bcrypt');

const createTempUser = async (req,res)=>{
    const {userEmail} = req.body;

    if(!userEmail) return res.status(400).json({success:false,message:"Email is missing"});

    const otp = 1000 + Math.floor(Math.random() * 9000);

    const hashedOTP = await bcrypt.hash(String(otp) , 10);

    try{
        await TempUser.create({
                email:userEmail,
                hashedOTP,
        })

        return res.status(200).json({success:true,message:"User created successfully"});
    }
    catch(e){
        return res.status(500).json({success:false ,message:e.message});
    }
}

module.exports = {createTempUser};
