import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import axios from "../utils/axios";
import Select from "react-select";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react"; 
import { AllChatContext } from "../contexts/AllChatContext";

const CreateGroup = () => {
 
  const [selectedOption, setselectedOption] = useState([]);
  const {allChats,setallChats} = useContext(AllChatContext);
  const [groupName, setgroupName] = useState("");
  const [optionsArr, setoptionsArr] = useState([]);
  const inputRef = useRef();
  const [profileStatus, setProfileStatus] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("/user/currentUser")
  //     .then((res) => {
  //       setCurrentUser(res.data.user);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }, []);
  

  const getOtherUser = (users, loggedInUser) => {
    return users.find((u) => u._id?.toString() !== loggedInUser?.toString());
  };

  useEffect(() => {
  if (allChats.length > 0) {
    const options = allChats
      .filter((chat) => !chat.isGroupChat)
      .map((chat) => {
        const otherUser = getOtherUser(chat.users, currentUser);
        return {
          value: otherUser,
          label: chat.chatName || otherUser.name,
        };
      });

    setoptionsArr(options);
  }
}, [allChats, currentUser]);

  const groupImage = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const fileChange = () => {
    if (inputRef?.current?.files.length == 1) setProfileStatus(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      toast.error("Please enter group name", { position: "top-center" });
      return;
    } else if (selectedOption.length == 0) {
      toast.error("Please select users to add", { position: "top-center" });
      return;
    } else if (inputRef.current.files.length == 0) {
      toast.error("Please select a group profile image ", {
        position: "top-center",
      });
      return;
    }

    const formData = new FormData();

    formData.append("GroupName", groupName);
    formData.append(
      "SelectedUsers",
      JSON.stringify(selectedOption.map((user) => user.value))
    );
    formData.append("GroupProfileImage", inputRef.current.files[0]);

    axios
      .post("/chat/group", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.status === 201) {
          toast.success("Group created successfully", {
            position: "top-center",
          });
        } else if (response.status === 200) {
          toast.info("Group already exists", { position: "top-center" });
        }
        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message, { position: "top-center" });
        }
        console.log(error.message);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="flex  h-[calc(100vh-8vh)] w-full">
        <Navbar2 />
        <div className=" h-full w-full flex justify-center items-center">
          <div className="bg-gray-50 shadow-xl rounded-md min-h-[30%] w-[70%] p-4 space-y-4">
            <Link to={"/"}>
              <ImCross className="ml-[95%] text-gray-400 cursor-pointer mb-2" />
            </Link>
            <h2 className="text-center font-extrabold tracking-wider text-gray-700 bg-gray-200 p-1">
              CREATE GROUP
            </h2>
            <form
              className="flex flex-col gap-1 w-[100%] space-y-2"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => {
                  setgroupName(e.target.value);
                }}
                className="bg-gray-100 outline-none p-1 rounded-md"
              />
              <Select
                onChange={(selected) => {
                  setselectedOption(selected);
                }}
                options={optionsArr}
                isMulti
                placeholder="Select users"
                className="outline-none border-none"
              />
              {profileStatus ? (
                <button
                  className="bg-green-100 outline-none p-1 rounded-md cursor-pointer text-gray-500"
                  disabled
                >
                  Selected
                </button>
              ) : (
                <button
                  className="bg-gray-100 outline-none p-1 rounded-md cursor-pointer text-gray-500"
                  type="button"
                  onClick={groupImage}
                >
                  Select Group Profile Picture
                </button>
              )}

              <input type="file" hidden ref={inputRef} onChange={fileChange} />

              <div className="flex justify-center"> 
                <button className="bg-[#4CAF93] outline-none p-1 rounded-md text-white font-bold tracking-wide cursor-pointer w-[60%]">
                SUBMIT
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateGroup;
