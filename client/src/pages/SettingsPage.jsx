import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import { useLocation } from "react-router-dom";
import axios from "../utils/axios";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { ToastContainer, toast ,Bounce} from "react-toastify";

const SettingsPage = () => {
  const inputRef = useRef();

  const profileInput = async (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const updateProfileImage = async () => {
    if (inputRef.current.files.length < 1) return;

    const formdata = new FormData();
    formdata.append("file", inputRef.current.files[0]);

    try {
      toast.info("Profile updated successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      
      const res = await axios.post("/user/profile", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const genrateAvatar = async () => {
    
    const formdata = new FormData();
    formdata.append("file", inputRef.current.files[0]);

    try {
      toast.info("Profile updated successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      
      const res = await axios.post("/user/profile", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh-8vh)] w-full overflow-hidden">
        <Navbar2 />
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-emerald-200 shadow-2xl h-fit w-[70%] rounded-md p-4 space-y-2 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <div className="text-center text-2xl font-semibold tracking-wide text-gray-800">
                Settings
              </div>
              <Link to={"/"}>
                <ImCross className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg" />
              </Link>
            </div>
            <form onSubmit={profileInput}>
              <button className="bg-emerald-50 rounded-md text-center w-full cursor-pointer">
                Update Profile Image
              </button>
            </form>
            <input
              type="file"
              encType="multipart/form-data"
              hidden
              ref={inputRef}
              onChange={updateProfileImage}
            />

            <button className="bg-emerald-50 rounded-md text-center cursor-pointer" onClick={genrateAvatar}>
              Generate Random Avatar
            </button>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
