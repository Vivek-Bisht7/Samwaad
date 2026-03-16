const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const path = require("path");

const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;

    const sender = req.user.id;

    let newMessage = await Message.create({ sender, chatId, content });

    newMessage = await newMessage.populate("sender", "userName userImage");

    newMessage = await newMessage.populate("chatId", "isGroupChat");

    const chat = await Chat.findOne({ _id: chatId });

    chat.latestMessage = newMessage._id;
    await chat.save();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Error : " + error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    let { chatId } = req.params;

    const allMessages = await Message.find({ chatId })
      .populate("sender", "userName userImage")
      .populate("chatId", "isGroupChat");

    return res.status(200).json({ success: true, allMessages });
  } catch (error) {
    console.error("Error : " + error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const uploadFile = async (req, res) => {
  try {
    const { chatId } = req.body;
    const sender = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File not provided",
      });
    }

    const url = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;

    let newMessage = await Message.create({
      sender,
      chatId,
      imageUrl: url,
    });

    newMessage = await newMessage.populate("sender", "userName userImage");
    newMessage = await newMessage.populate("chatId", "isGroupChat");

    const chat = await Chat.findById(chatId);
    chat.latestMessage = newMessage._id;
    await chat.save();

    return res.status(201).json({
      success: true,
      message: "File sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Error: " + error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { sendMessage, getAllMessages, uploadFile };
