import React, { useRef } from "react";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const inputRef = useRef();

  const logoutHandler = () => {
    axios
      .post("/user/logout")
      .then(function (res) {
        window.location.href = "/auth";
        console.log(res.data);
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const profileInput = async (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const updateProfileImage = async () => {
    if(inputRef.current.files.length <1) return;

    const formdata = new FormData();
    formdata.append("file", inputRef.current.files[0]);

    try {
      const res = await axios.post("/user/profile", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <div className="min-h-screen w-[3vw] bg-[#4CAF93]">
      {/* top icons */}
      <div className="flex flex-col gap-4 items-center h-[40%] pt-4">
        <VscThreeBars className="text-2xl text-white cursor-pointer" />
        <Link to="/createGroup"><MdGroups className="text-2xl text-white cursor-pointer" /></Link>
      </div>

      {/* bottom icons */}
      <div className="flex flex-col gap-4 items-center justify-end h-[50%]">
        <button>
          <IoIosSettings className="text-2xl text-white cursor-pointer" />
        </button>
        <form onSubmit={profileInput}>
          <button type="submit">
            <CgProfile className="text-2xl text-white cursor-pointer" />
          </button>
        </form>
        <input
          type="file"
          encType="multipart/form-data"
          hidden
          ref={inputRef}
          onChange={updateProfileImage}
        />
        <button onClick={logoutHandler}>
          <IoLogOut className="text-2xl text-white cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Navbar2;
