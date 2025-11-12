import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import Chat from "../components/Chat";
import socket from "../utils/socket";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Navbar2 from "../components/Navbar2";
import { ChatContext } from "../contexts/ChatContext";

const ChatPage = () => {
  const { currentUser } = useContext(UserContext);
  const { selectedChat } = useContext(ChatContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <768);

  useEffect(() => {
    if (!currentUser) return;

    const handleConnect = () => {
      console.log("Connected to server:", socket.id);
      socket.emit("UserOnline", currentUser.user);
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [currentUser]);

  useEffect(() => {
    if (!selectedChat?._id) return;
    socket.emit("joinChat", selectedChat._id);

    return () => {
      if (selectedChat) socket.emit("leaveChat", selectedChat._id);
    };
  }, [selectedChat]);

  return (
    <div>
      <Navbar />
      <div className="flex h-[88vh] w-[100%] overflow-hidden">
        <Navbar2 />
        {!isMobile && <Users />}
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
