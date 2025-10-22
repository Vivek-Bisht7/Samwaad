import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import axios from "../utils/axios";
import Select from "react-select";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

const CreateGroup = () => {
  const [allChats, setallChats] = useState([]);
  const [selectedOption, setselectedOption] = useState([]);
  const [optionsArr, setoptionsArr] = useState([])
  const inputRef = useRef(); 

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

 useEffect(() => {
    if (allChats.length > 0) {
      setoptionsArr(allChats.map((chat) => ({
        value: chat._id,
        label: chat.chatName,
      })));
    }
  }, [allChats]);

  const groupImage = (e)=>{    
    e.preventDefault();
    inputRef.current.click();
  }

  return (
    <div>
      <Navbar />
      <div className="flex  h-[calc(100vh-8vh)] w-[100%] overflow-hidden">
        <Navbar2 />
        <div className=" h-[100%] w-[100%] flex justify-center items-center">
          <div className="bg-gray-50 shadow-xl rounded-md h-[55%] w-[30%] p-4 space-y-4">
            <Link to={"/"}><ImCross className="ml-[95%] text-gray-400 cursor-pointer mb-2"/></Link>
            <h2 className="text-center font-extrabold tracking-wider text-gray-700 bg-gray-200 p-1">
              CREATE GROUP
            </h2>
            <form className="flex flex-col gap-1 w-[100%] space-y-2">
              <input
                type="text"
                placeholder="Group Name"
                className="bg-gray-100 outline-none p-1 rounded-md"
              />
              <Select
                onChange={(selected)=>{setselectedOption(selected)}}
                options={optionsArr}
                isMulti
                placeholder="Select users"
                className="outline-none border-none"
              />
              <button className="bg-gray-200 outline-none p-1 rounded-md cursor-pointer text-gray-500" type="button" onClick={groupImage}>
                Select Group Profile Picture
              </button>

              <input type="file" hidden ref={inputRef}/>

              <button className="bg-[#4CAF93] outline-none p-1 rounded-md text-white font-bold tracking-wide cursor-pointer w-[60%] ml-16">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
