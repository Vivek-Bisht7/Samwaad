import React, { useRef } from "react";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { VscThreeBars } from "react-icons/vsc";
import axios from "../utils/axios";

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
    //console.log(res);
  };

  return (
    <div className="min-h-screen w-[4vw] bg-[#4CAF93]">
      {/* top icons */}
      <div className="flex flex-col items-center h-[40%] pt-4">
        <VscThreeBars className="text-2xl text-white cursor-pointer" />
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
