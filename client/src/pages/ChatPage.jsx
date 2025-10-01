import React, { useEffect, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import Chat from "../components/Chat";
import socket from "../utils/socket";

const ChatPage = () => {
  const [selectedChat, setselectedChat] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });
  }, []);

  useEffect(() => {
    if (!selectedChat?._id) return;
    socket.emit("joinChat", selectedChat._id);

    return () => {
      if (selectedChat) socket.emit("leaveChat", selectedChat._id);
    };
  }, [selectedChat]);

  return (
    <ChatContext.Provider value={{ selectedChat, setselectedChat }}>
      <div>
        <Navbar />
        <div className="flex h-[calc(100vh-10vh)] w-[100%] overflow-hidden">
          <Users />
          <Chat />
        </div>
      </div>
    </ChatContext.Provider>
  );
};

export default ChatPage;
