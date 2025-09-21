import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import UserChat from "./UserChat";
import axios from "../utils/axios";

const Users = () => {

  const [allChats, setallChats] = useState([]);

  useEffect(() => {
    axios.get("/chat")
      .then((res)=>{
        setallChats(res.data.chats);
      })
      .catch((error)=>{
        console.error("Error : " + error.message);
      })
  
  }, [])
  
console.log(allChats);

  return (
    <div className="w-[35%] bg-gray-50 overflow-y-auto">
      <div className="px-2 py-3 space-y-3">
        <div className="w-full h-[6vh] bg-gray-300 rounded-2xl flex items-center px-3">
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

        
      
       

      </div>
    </div>
  );
};

export default Users;
