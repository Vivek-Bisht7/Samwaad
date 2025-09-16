import React from "react";
import { IoSearch } from "react-icons/io5";
import UserChat from "./UserChat";

const Users = () => {
  return (
    <div className="w-[35%] bg-gray-50 overflow-y-auto">
      <div className="px-2 py-3 space-y-3">
        <div className="w-full h-[6vh] bg-gray-300 rounded-2xl flex items-center px-3">
          <button className="cursor-pointer">
            <IoSearch />
          </button>

          <form action="" className="flex-1 px-2">
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Search"
            />
          </form>
        </div>

        
        <UserChat/>
        <UserChat/>
        <UserChat/>
        <UserChat/>
       

      </div>
    </div>
  );
};

export default Users;
