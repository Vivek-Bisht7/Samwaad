import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GoLog, GoPaperclip } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import { ChatContext } from "../contexts/ChatContext";
import axios from "../utils/axios";
import socket from "../utils/socket";
import { UserContext } from "../contexts/UserContext";

const Chat = () => {
  const typeMessageRef = useRef(null);
  const bottomMessageRef = useRef(null);
  const { selectedChat } = useContext(ChatContext);
  const {setCurrentUser} = useContext(UserContext);
  const [currentUser, setcurrentUser] = useState(null);
  const [messages, setmessages] = useState();
  const [content, setcontent] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState();
  const typingTimeoutRef = useRef(null);
  const [onlineUsers, setonlineUsers] = useState([]);

  // Used to fetch current user using backend
  useEffect(() => {
    axios
      .get("/user/currentUser")
      .then((response) => {
        setcurrentUser(response.data);
      })
      .catch((err) => {
        console.error("Error fetching Current User:", err);
      });
  }, []);

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser])
  

  // For getting all messages on every chat click
  useEffect(() => {
    typeMessageRef?.current?.focus();

    if (selectedChat) {
      axios
        .get(`/message/${selectedChat?._id}`)
        .then((response) => {
          setmessages(response.data.allMessages);
        })
        .catch((err) => {
          console.error("Error fetching messages:", err);
        });
    }
  }, [selectedChat]);

  // For realtime messaging
  useEffect(() => {
    const handleMessage = (message) => {
      if (message.chatId === selectedChat?._id) {
        setmessages((prev) => [...prev, message]);
      }
    };

    socket.on("messageReceived", handleMessage);

    // cleanup to avoid duplicate listeners
    return () => {
      socket.off("messageReceived", handleMessage);
    };
  }, [selectedChat]);

  // For auto scrolling messages
  useEffect(() => {
    if (messages?.length) {
      bottomMessageRef.current?.scrollIntoView({
        behaviour: "smooth",
        block: "end",
      });
    }
  }, [messages, typingUser]);

  // For Knowing typing status
  useEffect(() => {
    if (!selectedChat?._id) return;

    socket.on("typing", (user) => {
      setTypingUser(user);
    });

    socket.on("stopTyping", () => {
      setTypingUser();
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [selectedChat]);

  useEffect(() => {
    socket.on("UpdateUserOnlineStatus",(users)=>{
      setonlineUsers(users);
    })
  }, [])
 
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    const message = {
      chatId: selectedChat._id,
      sender: currentUser.user,
      content,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("/message", {
        chatId: selectedChat._id,
        content,
      });

      socket.emit("newMessage", message);
      setmessages((prev) => [...prev, message]);
      socket.emit("stopTyping", {
        chatId: selectedChat._id,
        user: currentUser,
      });
      setIsTyping(false);
      setcontent("");
      typeMessageRef.current.style.height = "30px";
    } catch (error) {
      console.log("Error : " + error.message);
    }
  };

  const typingIndicator = (e) => {
    if (!isTyping) {
      socket.emit("typing", { chatId: selectedChat._id, user: currentUser });
      setIsTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        chatId: selectedChat._id,
        user: currentUser,
      });
      setIsTyping(false);
    }, 2000);
  };

  const TypingIndicatorVisual = () => (
    <div className="flex items-center justify-center space-x-2 mx-2 h-6 bg-gray-300 rounded-2xl w-[15%]">
      <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-300"></span>
      <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-600"></span>
    </div>
  );

  const handleTextarea = (e)=>{
    setcontent(e.target.value);
    typingIndicator(e);
    typeMessageRef.current.style.height = "auto";
    typeMessageRef.current.style.height = typeMessageRef.current.scrollHeight + "px";      
  }

  const getOtherUser = (selectedChat, currentUser) => {
  if (!selectedChat || !currentUser) return null;

  return selectedChat.users.find(user => user._id !== currentUser.user);
}

  
  return selectedChat ? (
    <div className="w-[65%] bg-white px-2 pt-2 flex flex-col">
      {/*header*/}

      <div className="h-[10vh] w-full border-b-2 border-gray-300 px-3 py-1 flex justify-between">
        <div className="h-full flex items-center gap-2">
          <img
            src="/Images/userImage.png"
            alt="User Image"
            className="h-full rounded-full"
          />
          
          <div>
            <div className="font-semibold text-md">{selectedChat?.chatName}</div>
            <div className="text-sm">
  {onlineUsers.includes(getOtherUser(selectedChat, currentUser)?._id)
    ? "Online"
    : "Offline"}
</div>

          </div>
        </div>
        <form action="" className="text-2xl flex items-center cursor-pointer">
          <button className="text-2xl flex items-center cursor-pointer">
            <IoSearch />
          </button>
        </form>
      </div>

      {/*header over*/}

      {/*messages*/}
      <div className="flex-1  overflow-y-auto px-2 py-3 space-y-3">
        {messages &&
          messages.map((message, idx) => {
            const isCurrentUser = currentUser?.user === message.sender;

            return isCurrentUser ? (
              <div key={message._id || idx} className="flex justify-end">
                <div className="flex bg-[#4CAF93] px-3 py-2 rounded-xl max-w-[60%] text-[#FFFFFF]">
                  {message.content}
                </div>
              </div>
            ) : (
              <div key={message._id || idx} className="flex">
                <div className="flex bg-[#F1F1F1] text-[#212121] px-3 py-2 rounded-xl max-w-[60%]">
                  {message.content}
                </div>
              </div>
            );
          })}
        <div>{typingUser && TypingIndicatorVisual()}</div>
        <div ref={bottomMessageRef}></div>
      </div>
      {/*messages over*/}

      {/*Type message*/}

      <div className="flex items-center w-full  px-2 py-1 ">
        <div className="flex items-center h-10 gap-2 text-2xl text-[#212121]">
          <button className="cursor-pointer h-full w-10 flex items-center justify-center hover:bg-gray-200 hover:rounded-sm">
            <MdOutlineEmojiEmotions />
          </button>
          <button className="cursor-pointer h-full w-10 flex items-center justify-center hover:bg-gray-200 hover:rounded-sm">
            <GoPaperclip />
          </button>
        </div>
        <form className="flex flex-1 items-center mx-2" onSubmit={sendMessage}>
          <textarea
            name=""
            ref={typeMessageRef}
            rows={1}
            className="flex-1 w-full max-h-28 min-h-[30px] resize-none outline-none px-3"
            value={content}
            placeholder="Type a message"
            onChange={(e) => { handleTextarea(e)}}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(e);
              }
            }}
          ></textarea>

          <div className="flex items-center text-2xl p-1">
            <button className="cursor-pointer h-10 w-10 flex items-center justify-center hover:bg-gray-200 hover:rounded-sm">
              <IoSend />
            </button>
          </div>
        </form>
      </div>

      {/*Type message over*/}
    </div>
  ) : (
    <div className="bg-white w-[65%] flex items-center justify-center">
      <div className="text-center space-y-2 border border-dashed border-[#4CAF93] p-4 rounded-2xl">
        <p>Click on Any Chat</p>
        <p>
          <b>OR</b>
        </p>
        <p>Search User Globally or Locally to Start Chatting</p>
      </div>
    </div>
  );
};

export default Chat;
