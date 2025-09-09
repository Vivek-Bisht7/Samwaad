const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
     email:{
        type:String,
        required:true,
     },
     hashedOTP:{
        type:String,
     },
     otpExpiresAt:{
         type:Date,
         default: ()=> Date.now() + 5 * 60 * 1000,
     },
     isVerified:{
        type:Boolean,
        default:false,
     },
     recordExpiresAt:{
      type:Date,
      default: ()=> Date.now() + 24 * 60 * 60 * 1000,
     }
})

tempSchema.index({ recordExpiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('TempUser',tempSchema);