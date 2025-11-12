import React, { useRef, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

const Navbar2 = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


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
    <div className="h-[88vh] w-[9vw] md:w-[7vw] lg:w-[4vw] bg-[#4CAF93]">
      {/* top icons */}
      <div className="flex flex-col gap-4 items-center h-[40%] pt-4 ">
        {isMobile && <Link to={"/chats"}><VscThreeBars className="text-2xl text-white cursor-pointer"/></Link>}
        <Link to="/createGroup"><MdGroups className="text-2xl text-white cursor-pointer" /></Link>
      </div>

      {/* bottom icons */}
      <div className="flex flex-col gap-4 items-center justify-end h-[60%] pb-4">
        <Link to={"/settings"}>
          <button>
          <IoIosSettings className="text-2xl text-white cursor-pointer" />
        </button>
        </Link>
        <Link to={"/profile"}>
           <CgProfile className="text-2xl text-white cursor-pointer" />
        </Link>
        <button onClick={logoutHandler}>
          <IoLogOut className="text-2xl text-white cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Navbar2;
