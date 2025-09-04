import React, { useState } from "react";
import Navbar from "../components/Navbar";

const UserAuth = () => {
  const [status, setstatus] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar/>
      <div className="flex justify-center items-center min-h-[90vh]">
      <form
        action=""
        className="bg-white min-h-[30vh] w-[35%] border border-[#4CAF93] rounded-2xl p-4 shadow-md"
      >
        <div className="w-full">
          <button
            type="button"
            className={`w-1/2 h-[7vh] rounded-t-2xl font-semibold ${
              status ? "bg-[#4CAF93] text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setstatus(true);
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={` ${
              !status ? "bg-[#4CAF93] text-white" : "bg-gray-200 text-gray-700"
            } w-1/2 h-[7vh] rounded-t-2xl font-semibold`}
            onClick={() => {
              setstatus(false);
            }}
          >
            Register
          </button>
        </div>

        {status ? (
          <div className="w-full">
            <input
              type="email"
              placeholder="Enter E-mail"
              className="w-full h-[6vh] px-3 bg-gray-100 outline-none focus:ring-2 focus:ring-[#4CAF93] rounded-md text-black mt-4"
              autoComplete="off"
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full h-[6vh]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
              required
            />

            <button className="bg-[#4CAF93] text-white  w-full h-[6vh] font-semibold rounded-md mt-5 cursor-pointer">
              Login
            </button>
          </div>
        ) : (
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full h-[6vh]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
              required
            />

            <div className="w-full h-[6vh]">
              <input
              type="email"
              placeholder="Enter E-mail"
              className="w-[80%]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
              required
            />
            <button className="w-[18%] ml-2 rounded-md border-2 border-[#4CAF93] text-[#212121] cursor-pointer">
              Get OTP
            </button>
            </div>

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full h-[6vh]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
              required
            />

            <button className="bg-[#4CAF93] text-white w-full h-[6vh] font-semibold rounded-md mt-5 cursor-pointer">
              Register
            </button>
          </div>
        )}
      </form>
    </div>
    </div>
  );
};

export default UserAuth;
