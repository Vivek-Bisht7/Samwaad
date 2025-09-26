const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');


const sendMessage = async (req,res)=>{

    try{
        const {chatId , content} = req.body;
        const sender = req.user.id;

        let newMessage = await Message.create({sender,chatId,content});

        newMessage = await newMessage.populate("sender", "userName userImage");

        const chat = await Chat.findOne({_id:chatId});
        
        chat.latestMessage = newMessage._id;
        await chat.save();
        
        return res.status(201).json({success:true, message:"Message sent successfully" , newMessage});
    }
    catch(error){
        console.error("Error : " + error.message);
        return res.status(500).json({"Error":error.message});
    }
}

const getAllMessages = async (req,res)=>{

    try{
        let {chatId} = req.params;

        const allMessages = await Message.find({chatId});

        return res.status(200).json({success:true,allMessages});
    }
    catch(error){
        console.error("Error : " + error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
    }

}

module.exports = {sendMessage,getAllMessages};