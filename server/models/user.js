const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    userEmail:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    userPassword:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
        default:"",
    },
    userImage:{
        type:String,
        default:"/Images/userImage.png",
    },
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);