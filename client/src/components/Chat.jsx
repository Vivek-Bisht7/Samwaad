import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import { IoSend } from "react-icons/io5";

const Chat = () => {
  useEffect(() => {
    typeMessage.focus();
  }, [])
  

  return (
    <div className="w-[65%] bg-white px-2 pt-2 flex flex-col">
      {/*header*/}

      <div className="h-[10vh] w-full border-b-2 border-gray-300 px-3 py-1 flex justify-between">
        <div className="h-full flex items-center gap-2">
          <img
            src="/public/Images/userImage.webp"
            alt="User Image"
            className="h-full rounded-full"
          />

          <div className="font-semibold text-md">Vivek Bisht</div>
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

        {/*incoming message*/}
        <div className="flex">
          <div className="flex bg-[#F1F1F1] text-[#212121] px-3 py-2 rounded-xl max-w-[60%]">
            Hey.......how are youu my friend?
        </div>
        </div>

        {/*Outgoing message*/}
        <div className="flex justify-end">
          <div className="flex bg-[#4CAF93] px-3 py-2 rounded-xl max-w-[60%] text-[#FFFFFF]">
            Hey.......how are youu my friend?
        </div>
        </div>
        
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
        <form action="" className="flex flex-1 items-center mx-2">
          <textarea
            name=""
            id="typeMessage"
            rows={1}
            className="flex-1 w-full max-h-28 min-h-[30px] resize-none outline-none px-3"
            placeholder="Type a message"
            onChange={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px"; 
            }}
          ></textarea>
        </form>
        <div className="flex items-center text-2xl p-1">
          <button className="cursor-pointer h-10 w-10 flex items-center justify-center hover:bg-gray-200 hover:rounded-sm">
            <IoSend />
          </button>
        </div>
      </div>

      {/*Type message over*/}
    </div>
  );
};

export default Chat;
