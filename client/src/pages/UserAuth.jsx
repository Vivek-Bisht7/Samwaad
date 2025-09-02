import React, { useState } from "react";

const UserAuth = () => {
  const [status, setstatus] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FAFAFA]">
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
              className="w-full h-[6vh] px-3 bg-gray-100 outline-none focus:ring-3 focus:ring-[#4CAF93] rounded-md text-black mt-4"
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full h-[6vh]  px-3 focus:ring-3 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
            />

            <button className="bg-[#4CAF93] text-white  w-full h-[6vh] font-semibold rounded-md mt-5">
              Login
            </button>
          </div>
        ) : (
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full h-[6vh]  px-3 focus:ring-3 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
            />

            <input
              type="email"
              placeholder="Enter E-mail"
              className="w-full h-[6vh]  px-3 focus:ring-3 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full h-[6vh]  px-3 focus:ring-3 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
            />

            <button className="bg-[#4CAF93] text-white  w-full h-[6vh] font-semibold rounded-md mt-5">
              Get OTP
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserAuth;
