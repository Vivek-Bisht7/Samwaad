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
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    const url = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

    let newMessage = await Message.create({ sender, chatId, imageUrl: url });

    const chat = await Chat.findOne({ _id: chatId });

    // const extName = path.extname(req.file.filename);

    // const allowedExtensionsImages = [
    //   ".png",
    //   ".jpg",
    //   ".jpeg",
    //   ".gif",
    //   ".bmp",
    //   ".webp",
    //   ".svg",
    //   ".tiff",
    // ];
    // if (allowedExtensionsImages.includes(extName.toLowerCase())) {
    //     chat.latestMessage = "Image";
    //     await chat.save();
    // }

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

module.exports = { sendMessage, getAllMessages, uploadFile };
