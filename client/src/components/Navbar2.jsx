import React from "react";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { VscThreeBars } from "react-icons/vsc";
import axios from '../utils/axios'

const Navbar2 = () => {
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

  return (
    <div className="min-h-screen w-[4vw] bg-[#4CAF93]">
      {/* top icons */}
      <div className="flex flex-col items-center h-[40%] pt-4">
        <VscThreeBars className="text-3xl text-white cursor-pointer"/>
      </div>

      {/* bottom icons */}
      <div className="flex flex-col gap-4 items-center justify-end h-[50%]">
        <button>
          <IoIosSettings className="text-3xl text-white cursor-pointer"/>
        </button>
        <button>
          <CgProfile className="text-3xl text-white cursor-pointer"/>
        </button>
        <button onClick={logoutHandler}><IoLogOut className="text-3xl text-white cursor-pointer" /></button>
      </div>
    </div>
  );
};

export default Navbar2;
