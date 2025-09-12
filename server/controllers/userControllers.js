const TempUser = require('../models/tempUser');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req,res)=>{
    const {userName,userEmail,userPassword} = req.body;

    const temporaryUser = await  TempUser.findOne({email:userEmail});
    const user = await User.findOne({userName});

    if(!temporaryUser || !temporaryUser.isVerified){
        return res.status(400).json({success:false,message:"User not verified"})
    }

    if(user){
        return res.json({success:false,message:"Username already exists"});
    }

    try{
        const hashedPassword = await bcrypt.hash(userPassword,10);

        const newUser = await User.create({userName,userEmail,userPassword:hashedPassword});

        return res.status(200).json({success:true , message:"User created successfully"});
        
    }
    catch(err){
        console.log("Error : " + err.message);
    }



    
}

module.exports = {registerUser};  