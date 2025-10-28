import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import { useLocation } from "react-router-dom";
import axios from "../utils/axios";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import ViewImage from "./ViewImage";

const GroupDetails = () => {
  const location = useLocation();
  const { group } = location.state || {};
  console.log(group);

  const [groupAdminName, setgroupAdminName] = useState("");
  const [groupAdminEmail, setgroupAdminEmail] = useState("");

  useEffect(() => {
    if (!group?.groupAdmin) return;
    axios
      .get(`/user/getUserById/${group.groupAdmin}`)
      .then((res) => {
        setgroupAdminName(res.data.user.userName);
        setgroupAdminEmail(res.data.user.userEmail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <div className="flex items-center justify-center h-[100%] w-[100%]">
          <div className="bg-emerald-100 shadow-2xl h-[80%] w-[60%] rounded-md p-4 space-y-2 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <div className="text-3xl font-semibold tracking-wide text-gray-800">
                Group Details
              </div>
              <Link to={"/"}>
                <ImCross className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg" />
              </Link>
            </div>
            <div className="flex h-[80%]">
              <div className="h-[80%] w-[50%] p-2 space-y-3">
                <div className=" text-gray-700">
                  <b>Name :</b> {group.chatName}
                </div>
                <div className=" text-gray-700">
                  <b>Created At :</b> {getFormattedTime(group.createdAt)}
                </div>
                <div className=" text-gray-700">
                  <b>Admin Name :</b> {groupAdminName}
                </div>
                <div className=" text-gray-700">
                  <b>Admin E-mail :</b> {groupAdminEmail}
                </div>
                <div className=" text-gray-700">
                  <b>Profile Image :</b>
                </div>
                <Link to="/view" state={{ URL: group?.groupImage }}>
                  <img
                    src={`${group.groupImage}`}
                    alt="Group Image"
                    className="h-[50%]"
                  />
                </Link>
              </div>
              <div className="h-[100%] w-[50%] bg-emerald-50 rounded-md p-4 space-y-4">
                <div className="font-semibold tracking-wide  text-gray-800 text-xl  text-center">
                  Group Members
                </div>
                <div className="overflow-y-auto h-[90%]">
                  <li className="space-y-2">
                    {group?.users.map((user) => (
                      <p
                        key={user._id}
                        className="p-2 hover:bg-emerald-100 font-semibold text-gray-700"
                      >
                        {user.userName}
                      </p>
                    ))}
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
