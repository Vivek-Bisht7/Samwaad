const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName : { 
        type : String,
        trim : true,
    },
    latestMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    users : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    isGroupChat : {
        type : Boolean,
        default : false,
    },
    groupAdmin : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    chatImage : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    groupImage : {
        type : String,
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("Chat",chatSchema);