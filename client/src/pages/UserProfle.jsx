import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "../utils/axios";

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [userData, setuserData] = useState();

  useEffect(() => {
    if (!currentUser) return;

    axios
      .get(`/user/getUserById/${currentUser.user}`)
      .then((res) => {
        setuserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser]);

  const getFormattedTime = (time) => {
    const objTime = new Date(time);
    const istTime = objTime.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    return istTime.toUpperCase();
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh-8vh)] w-[100%] overflow-hidden">
        <Navbar2 />

        <div className="flex flex-col items-center justify-center bg-emerald-100 h-[100%] w-[100%]">
          <div className="flex w-[70%] justify-end">
            <Link to={"/"}>
              <ImCross className="text-gray-400  hover:text-gray-600 cursor-pointer text-xl m-2" />
            </Link>
          </div>
          <div className="w-[80%] bg-white shadow-2xl rounded-xl p-10">
            <div className="h-50 w-full  flex justify-center p-3">
              <Link to={"/view"} state={{ URL: userData?.userImage }}>
                <img
                  src={userData?.userImage}
                  alt="User Image"
                  className="h-[100%] object-cover rounded-full hover:border-emerald-500 hover:border-2"
                />
              </Link>
            </div>
            <div className="flex justify-center items-center w-full flex-col p-4 space-y-2 text-gray-800">
              <b className="text-3xl">{userData?.userName}</b>
              <div className="font-semibold">{userData?.userEmail}</div>
              <div>Joined on {getFormattedTime(userData?.createdAt)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
