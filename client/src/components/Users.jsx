import React, { useEffect, useState, useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { IoSearch } from "react-icons/io5";
import UserChat from "./UserChat";
import axios from "../utils/axios";
import { UserContext } from "../contexts/UserContext";
import socket from "../utils/socket";

const Users = () => {
  const [allChats, setallChats] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { selectedChat, setselectedChat } = useContext(ChatContext);

  useEffect(() => {
    axios
      .get("/chat")
      .then((res) => {
        setallChats(res.data.chats);
      })
      .catch((error) => {
        console.error("Error : " + error.message);
      });
  }, []);

  const temp = (user) => {
    setselectedChat(user);
  };

  const getOtherUser = (selectedChat, currentUser) => {
    if (!selectedChat || !currentUser) return null;

    return selectedChat?.users?.find((user) => user._id !== currentUser.user);
  };

  //for realtime latest message update
  useEffect(() => {
    if (!socket) return;

    const handleUpdateLatestMessage = (message) => {
      setallChats((prevChats) => {
        return prevChats.map((chat) =>
          chat._id === message.chatId
            ? {
                ...chat,
                latestMessage: {
                  content: message.content,
                  createdAt: message.createdAt,
                },
              }
            : chat
        );
      });
    };

    socket.on("updateLatestMessage", handleUpdateLatestMessage);

    return () => {
      socket.off("updateLatestMessage", handleUpdateLatestMessage);
    };
  }, []);

  const getMessageTime = (messageTime) => {
    console.log(messageTime);

    const objTime = new Date(messageTime);
    const istTime = objTime.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
    });
    return istTime.toUpperCase();
  };

  return (
    <div className="w-[30%] border-r bg-white border-gray-100 overflow-y-auto ">
      <div className="px-2 py-3 space-y-1">
        <div className="w-full h-[6vh] border border-gray-200 shadow shadow-neutral-200 border-b-[#4CAF93] border-b-2 rounded-sm flex items-center px-3 mb-3">
          <button className="cursor-pointer">
            <IoSearch />
          </button>

          <form className="flex-1 px-2">
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Search"
            />
          </form>
        </div>

        {allChats.map((user, index) => (
          <UserChat
            key={index}
            chatName={user?.chatName}
            latestMessage={user.latestMessage?.content}
            imageUrl={getOtherUser(user, currentUser)?.userImage}
            messageTime={
                getMessageTime(user?.latestMessage?.createdAt)
            }
            onClick={() => temp(user)}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
