const Chat = require("../models/chatModel");

const createChat = async (req, res) => {
  try {
    const senderId = req.user.id;

    const receiverId = req.body.receiverId;

    if (!receiverId) {
      return res
        .status(400)
        .json({ success: false, message: "ReceiverId is required" });
    }

    let chat = await Chat.findOne({
      users: { $all: [senderId, receiverId] },
      isGroupChat: false,
    }).populate("users", "userName userImage");

    if (!chat) {
      chat = await Chat.create({
        users: [senderId, receiverId],
      });
      chat = await chat.populate("users", "userName userImage");
    }

    return res.status(201).json({ success: true, chat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getOtherUser = (users , loggedInUser) => {
  return users.find((u)=> u._id.toString() !== loggedInUser.toString());
}

const getAllChat = async (req, res) => {
  try {
    const currentUser = req.user.id;

    let chats = await Chat.find({ users: currentUser })
        .populate("users" , "userName userImage")
        .populate("latestMessage" , "content createdAt")
        .sort({ updatedAt: -1 });

    if(!chats) return res.status(404).json({success:false,message:"Chats not found"});

    chats = chats.map((chat)=>{

      if(!chat.isGroupChat){
        const otherUser = getOtherUser(chat.users,currentUser);

        return{
          ...chat.toObject(),
          chatName : otherUser?.userName,
          
        }
      }
      return chat;
    })

    return res.status(201).json({ success: true, chats });

  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createChat, getAllChat };
