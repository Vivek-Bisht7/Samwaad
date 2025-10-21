import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import axios from "../utils/axios";

const CreateGroup = () => {
  const [allChats, setallChats] = useState([]); 

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


  return (
    <div>
      <Navbar />
      <div className="flex  h-[calc(100vh-8vh)] w-[100%] overflow-hidden">
        <Navbar2 />
        <div className="bg-white h-[100%] w-[100%] flex justify-center items-center">
          <div className="bg-gray-50 shadow-xl rounded-md h-[80%] w-[30%] p-4">
            <h2 className="text-center font-extrabold tracking-wider text-gray-700 bg-gray-200 p-1">
              CREATE GROUP
            </h2>
            <form className="flex flex-col gap-1 w-[100%] p-2">
              <input
                type="text"
                placeholder="Group Name"
                className="bg-gray-100 outline-none p-1 rounded-md"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
