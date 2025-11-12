import React, { useEffect, useState } from "react";
import UserAuth from "./pages/UserAuth";
import ChatPage from "./pages/ChatPage";
import CreateGroup from "./pages/CreateGroup";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { AllChatContext } from "./contexts/AllChatContext";
import { ChatContext } from "./contexts/ChatContext";
import GroupDetails from "./pages/GroupDetails";
import ViewImage from "./pages/ViewImage";
import UserProfile from "./pages/UserProfle";
import SettingsPage from "./pages/SettingsPage";
import Users from "./components/Users";
import socket from "./utils/socket";
import { ToastContainer, toast, Bounce } from "react-toastify";

const App = () => {
  const [selectedChat, setselectedChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [allChats, setallChats] = useState([]);

  return (
    <>
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
      <ChatContext.Provider value={{ selectedChat, setselectedChat }}>
        <AllChatContext.Provider value={{ allChats, setallChats }}>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/chats" element={<Users />} />
              <Route path="/auth" element={<UserAuth />} />
              <Route path="/createGroup" element={<CreateGroup />} />
              <Route path="/groupDetails" element={<GroupDetails />} />
              <Route path="/view" element={<ViewImage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </UserContext.Provider>
        </AllChatContext.Provider>
      </ChatContext.Provider>
    </>
  );
};

export default App;
