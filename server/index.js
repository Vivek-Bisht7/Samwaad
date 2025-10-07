const express = require("express");
const app = express();
const { dbConnection } = require("./config/connection");
const tempUserRoutes = require("./routes/tempUserRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require('path');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

require("dotenv").config();
dbConnection();

const OnlineUsers = new Map();

io.on("connection" , (socket)=>{
  console.log("User connected : " + socket.id);

  socket.on("joinChat" , (chatId)=>{
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat : ${chatId}`);
  })

  socket.on("newMessage",(message)=>{
    socket.to(message.chatId).emit("messageReceived" , message);
  })

  socket.on("leaveChat",(chatId)=>{
    socket.leave(chatId);
    console.log(`${socket.id} left Chat: ${chatId}`);
  })

  socket.on("typing" , ({chatId , user})=>{
    socket.to(chatId).emit("typing",user);
  });

  socket.on("stopTyping" , ({chatId , user})=>{
    socket.to(chatId).emit("stopTyping",user);
  });

  socket.on("UserOnline",(UserId)=>{
    OnlineUsers.set(socket.id,UserId);
    io.emit("UpdateUserOnlineStatus",Array.from(OnlineUsers.values()));
  })

  socket.on("disconnect" , ()=>{
    console.log("User Disconnected : "+  socket.id);

    const UserId = OnlineUsers.get(socket.id);
    if(!UserId) return;

    OnlineUsers.delete(socket.id);
    io.emit("UpdateUserOnlineStatus",Array.from(OnlineUsers.values()));
  })

})

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static(path.join(__dirname, "public/Images/uploads")));

app.use("/api/otp", tempUserRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

server.listen(process.env.PORT, () => {
  console.log("Server has started running..");
});
