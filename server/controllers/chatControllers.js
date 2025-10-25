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

const getOtherUser = (users, loggedInUser) => {
  return users.find((u) => u._id.toString() !== loggedInUser.toString());
};

const getAllChat = async (req, res) => {
  try {
    const currentUser = req.user.id;

    let chats = await Chat.find({ users: currentUser })
      .populate("users", "userName userImage")
      .populate("latestMessage", "content createdAt")
      .sort({ updatedAt: -1 });

    if (!chats)
      return res
        .status(404)
        .json({ success: false, message: "Chats not found" });

    chats = chats.map((chat) => {
      if (!chat.isGroupChat) {
        const otherUser = getOtherUser(chat.users, currentUser);

        return {
          ...chat.toObject(),
          chatName: otherUser?.userName,
        };
      }
      return chat;
    });

    return res.status(201).json({ success: true, chats });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const createGroupChat = async (req, res) => {

  if (!req.body?.GroupName) {
    return res
      .status(400)
      .json({ success: false, message: "Group Name is required.." });
  }
  if (JSON.parse(req.body?.SelectedUsers).length===0) {
    return res
      .status(400)
      .json({ success: false, message: "Please select users.." });
  }
  if (!req.file?.filename) {
    return res
      .status(400)
      .json({ success: false, message: "Group Image is required.." });
  }

  const arr = JSON.parse(req.body.SelectedUsers);
  arr.push(req.user.id);

  let group = await Chat.findOne({
    chatName: req.body.GroupName,
    users: {$all:arr},
    isGroupChat: true,
    groupAdmin: req.user.id,
  })

  if(group) return res
      .status(200)
      .json({ success: true, message: "Group already exists" });

   group = await Chat.create({
    chatName: req.body.GroupName,
    users: arr,
    isGroupChat: true,
    groupAdmin: req.user.id,
    groupImage: `http://localhost:3000/group/${req.file.filename}`,
  });

  return res
      .status(201)
      .json({ success: true, message: "Group created successfully" });
};

module.exports = { createChat, getAllChat, createGroupChat };
