import React, { useEffect, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import Chat from "../components/Chat";
import socket from "../utils/socket";
import { useContext } from "react";
import { UserContext} from "../contexts/UserContext";

const ChatPage = () => {
  const [selectedChat, setselectedChat] = useState(null);
  const {currentUser} = useContext(UserContext);

  
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
