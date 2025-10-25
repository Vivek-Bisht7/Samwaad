const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    sender:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    chatId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Chat",
        required : true,
    },
    content:{
        type : String,
        trim : true,
    },
    imageUrl:{
        type : String,
        default : null,
    },
} ,
    {timestamps:true},
)

module.exports = mongoose.model("Message",messageSchema);