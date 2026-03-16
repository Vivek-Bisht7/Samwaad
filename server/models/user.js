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
        default:"https://res.cloudinary.com/dayosnlay/image/upload/v1773680700/project/uploads/1773680698421-userImage.jpg.jpg",
    },
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);