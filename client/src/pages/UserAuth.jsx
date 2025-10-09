import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import OTPInput from "../components/OTPInput";
import Timer from "../components/Timer";
import axios from "../utils/axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {Link,useNavigate} from 'react-router-dom';

const UserAuth = () => {
  const navigate = useNavigate();

  //To toggle between Login and Register button
  const [status, setstatus] = useState(true);

  //to disable OTP button
  const [otpBtnStatus, setotpBtnStatus] = useState(false);
  const [otpBtnText, setotpBtnText] = useState("Get OTP");

  //to disable verify button
  const [getOTP, setgetOTP] = useState(false);
  const [verify, setverify] = useState(true);

  //Register form credentials
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");

  //Login form credentials
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  // OTP Value by user
  const [OTP, setOTP] = useState();

  //regex to check correctness of email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //verfication status
  const [verificationStatus, setverificationStatus] = useState(false);

  const sendOTP = () => {

    if(otpBtnStatus){
      return;
    }
    if(!userEmail){
      toast.error("Email is required");
      return;
    }
    if(!emailRegex.test(userEmail)){
      toast.error("Enter a valid Email");
      return;
    }

    axios
      .post("/otp", { userEmail })
      .then(function (res) {
        if (res.data.success === true) {
          toast.info("OTP has been sent to your Mail");
          setotpBtnStatus(true);
          setgetOTP(true);
        } else if (res.data.message === "Email is already taken") {
          toast.error("Email is already taken");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch(function (err) {
          toast.error(err.response.data.message);
          console.error(err.message);
      });
  };

  const otpSetter = (data) => {
    setOTP(data);
    setverify(false);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    
    if(!verificationStatus){
      toast.error("User not verified")
      return;
    }

    if (!userName){
      toast.error("Username is required");
      return;
    } 

    if(!userEmail){
      toast.error("Email is required");
      return;
    }

    if(!userPassword){
      toast.error("Password is required");
      return;
    }

    if(userName.includes(" ")){
      toast.error("Spaces are not allowd in username");
      return;
    }
      try {
        const res = await axios.post(
          "/user/register",
          { userName, userEmail, userPassword }
        );

        if (
          res.data.success === false &&
          res.data.message === "Username already exists"
        ) {
          return toast.error("UserName already exists");
        }
        setverificationStatus(false);
        setstatus(true);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log("Error : " + err.message);
      }
    
  };

  const verificationHandler = async () => {
    try {
      const res = await axios.post("/otp/verify", {
        userEmail,
        OTP,
      });

      if (res.data.success === true) {
        toast.success("Verified Successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setgetOTP(false);
        setotpBtnText("Verified");
        setloginEmail(userEmail);
        setloginPassword(userPassword);
        setverificationStatus(true);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        if (err.response.data.message === "Time limit exceeded") {
          setotpBtnStatus(false);
          setotpBtnText("Resend OTP");
        }
      }
    }
  };

  const loginHandler =async (e)=>{
    
    e.preventDefault();

    if(!loginEmail){
      toast.error("Email is required");
      return;
    }
    if(!loginPassword){
      toast.error("Password is required");
      return;
    }
    if(!emailRegex.test(loginEmail)){
      toast.error("Enter correct E-mail");
      return;
    }

    try{
      const res = await axios.post("/user/login",{loginEmail,loginPassword});

      if(res.status===200){
        navigate("/");
      }
      
      
    }
    catch(error){
      toast.error(error.response.data.message)
    }

  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <ToastContainer
        position="top-center"
        autoClose={4000}
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
      <Navbar />
      <div className="flex justify-center items-center min-h-[90vh]">
        <form
          action=""
          className="bg-white min-h-[30vh] w-[35%]  rounded-2xl p-4 shadow-sm shadow-[#4CAF93]"
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
                !status
                  ? "bg-[#4CAF93] text-white"
                  : "bg-gray-200 text-gray-700"
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
                onChange={(e) => {
                  setloginEmail(e.target.value);
                }}
                className="w-full h-[6vh] px-3 bg-gray-100 outline-none focus:ring-2 focus:ring-[#4CAF93] rounded-md text-black mt-4"
                autoComplete="off"
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={loginPassword}
                onChange={(e) => {
                  setloginPassword(e.target.value);
                }}
                className="w-full h-[6vh]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
                autoComplete="off"
                required
              />

              <button className="bg-[#4CAF93] text-white  w-full h-[6vh] font-semibold rounded-md mt-4 cursor-pointer" type="button" onClick={loginHandler}>
                Login
              </button>
            </div>
          ) : (
            // Registration

            <div className="w-full">
              <input
                type="text"
                placeholder="Enter User Name"
                value={userName}
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
                className="w-full h-[6vh]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
                autoComplete="off"
                required
              />

              <div className="flex items-center min-w-full h-[6vh] mt-4">
                <input
                  type="email"
                  placeholder="Enter E-mail"
                  value={userEmail}
                  onChange={(e) => {
                    setuserEmail(e.target.value);
                  }}
                  className="min-w-3/4  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121]  h-full"
                  autoComplete="off"
                  required
                  disabled={verificationStatus}
                />
                <button
                  className="w-full ml-2 rounded-md border-2 border-[#4CAF93] text-[#212121] cursor-pointer h-full hover:bg-[#4CAF93] hover:text-white"
                  type="button"
                  onClick={sendOTP}
                >
                  {otpBtnText}
                </button>
              </div>

              {getOTP ? (
                <div className="mt-4  w-full h-[6vh] flex justify-between items-center">
                  <OTPInput onOtpComplete={otpSetter} />
                  <Timer />
                  <button
                    type="button"
                    className="w-[18%] ml-2 rounded-md border-2 border-[#4CAF93] text-[#212121] cursor-pointer h-full hover:bg-[#4CAF93] hover:text-white"
                    disabled={verify}
                    onClick={verificationHandler}
                  >
                    Verify
                  </button>
                </div>
              ) : (
                <div className=""></div>
              )}

              <input
                type="password"
                placeholder="Enter Password"
                value={userPassword}
                onChange={(e) => {
                  setuserPassword(e.target.value);
                }}
                className="w-full h-[6vh]  px-3 focus:ring-2 focus:ring-[#4CAF93] rounded-md bg-gray-100 outline-none text-[#212121] mt-4"
                autoComplete="off"
                required
              />

              <button
                className="bg-[#4CAF93] text-white w-full h-[6vh] font-semibold rounded-md mt-4 cursor-pointer"
                type="button"
                onClick={registerHandler}
              >
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
