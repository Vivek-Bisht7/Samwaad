import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { IoSearch } from "react-icons/io5";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { ChatContext } from "../contexts/ChatContext";
import { UserContext } from "../contexts/UserContext";
import { AllChatContext } from "../contexts/AllChatContext";
import socket from "../utils/socket";

const Navbar = () => {
  const [user, setuser] = useState("");
  const { currentUser } = useContext(UserContext);
  const {allChats,setallChats} = useContext(AllChatContext); 
  const chatContext = useContext(ChatContext);
  const setselectedChat = chatContext?.setselectedChat;

  const searchUser = (e) => {
    e.preventDefault();

    if (!user.trim()) return;

    axios
      .post("/user/getUser", {
        user,
      })
      .then(function (response) {
        axios
          .post("/chat", {
            receiverId: response.data.user._id,
          })
          .then(function (res) {
              setselectedChat(res.data.chat);
              if(!allChats.some(c => c._id === res.data.chat._id)){ setallChats((prev)=>[...prev,res.data.chat]);
              socket.emit("newChat",res.data.chat,response.data.user._id);
              }
          })
          .catch(function (err) {
            console.log(err);
          });
      })
      .catch(function (error) {
        if (error.status) {
          toast.error(`${error.response.data.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            className: "text-sm h-[40px]",
          });
        }

        console.log(error);
      });

    setuser("");
  };
  
  return (
    <nav className={`flex flex-col items-center justify-center space-y-2 p-2 text-3xl text-[#FAFAFA] bg-[#4CAF93] ${currentUser?"h-[12vh]":"h-[8vh] p-4"}`}>
      <pre className="tracking-wide text-2xl font-sans font-semibold">  SAMWAAD</pre>
      <div className="flex h-[4vh]">
        {currentUser ? (
          <form
            className="flex items-center gap-1 rounded-2xl border border-white px-3"
            onSubmit={searchUser}
          >
            <button type="submit">
              <IoSearch className="text-xl cursor-pointer" />
            </button>
            <input
              type="text"
              className="flex justify-center outline-none text-sm md:text-lg text-white w-[70vw] md:w-[45vw] lg:w-[28vw] placeholder:text-white"
              placeholder="Search user Globally by email or username"
              onChange={(e) => {
                setuser(e.target.value);
              }}
              value={user}
            />
          </form>
        ) : (
          <></>
        )}

        <ToastContainer
          position="top-center"
          autoClose={5000}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </nav>
  );
};

export default Navbar;
