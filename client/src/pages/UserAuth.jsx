import React, { useState } from "react";
import Navbar from "../components/Navbar";
import OTPInput from "../components/OTPInput";
import Timer from "../components/Timer";

const UserAuth = () => {
  //To toggle between Login and Register button
  const [status, setstatus] = useState(true);

  //To show OTP field only when GET OTP button is clicked
  const [getOTP, setgetOTP] = useState(false);

  //Register form credentials
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");

  //Login form credentials
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  //regex to check correctness of email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const sendOTP = ()=>{
    setgetOTP(true);
  }


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
              value={loginEmail}
              onChange={(e)=>{setloginEmail(e.target.value)}}
              className="w-full h-[6vh] px-3 bg-gray-100 outline-none focus:ring-2 focus:ring-[#4CAF93] rounded-md text-black mt-4"
              autoComplete="off"
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={loginPassword}
              onChange={(e)=>{setloginPassword(e.target.value)}}
              className="w-full h-[6vh]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
              required
            />

            <button className="bg-[#4CAF93] text-white  w-full h-[6vh] font-semibold rounded-md mt-4 cursor-pointer">
              Login
            </button>
          </div>
        ) : (
          // Registration

          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Name"
              value={userName}
              onChange={(e)=>{setuserName(e.target.value)}}
              className="w-full h-[6vh]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
              required
            />

            <div className="w-full h-[6vh]">
              <input
              type="email"
              placeholder="Enter E-mail"
              value={userEmail}
              onChange={(e)=>{setuserEmail(e.target.value)}}
              className="w-[80%]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4 h-full"
              autoComplete="off"
              required
            />
            <button className="w-[18%] ml-2 rounded-md border-2 border-[#4CAF93] text-[#212121] cursor-pointer h-full hover:bg-[#4CAF93] hover:text-white" type="button" onClick={sendOTP}
            disabled={!userName || !emailRegex.test(userEmail)}>
              Get OTP
            </button>
            </div>

            {getOTP ? (
              <div className="mt-8  w-full h-[6vh] flex justify-between items-center">
              <OTPInput/>
              <Timer/>
              <button type="button" className="w-[18%] ml-2 rounded-md border-2 border-[#4CAF93] text-[#212121] cursor-pointer h-full hover:bg-[#4CAF93] hover:text-white">Verify</button>
            </div>
            ):
              <div className="mt-4"></div>
            }

            <input
              type="password"
              placeholder="Enter Password"
              value={userPassword}
              onChange={(e)=>{setuserPassword(e.target.value)}}
              className="w-full h-[6vh]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
              autoComplete="off"
              required
            />

            <button className="bg-[#4CAF93] text-white w-full h-[6vh] font-semibold rounded-md mt-4 cursor-pointer " >
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
