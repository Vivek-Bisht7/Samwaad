import React, { useState } from "react";
import UserAuth from "./pages/UserAuth";
import ChatPage from "./pages/ChatPage";
import CreateGroup from "./pages/CreateGroup";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { AllChatContext } from "./contexts/AllChatContext";
import GroupDetails from "./pages/GroupDetails";
import ViewImage from "./pages/ViewImage";
import UserProfile from "./pages/UserProfle";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allChats, setallChats] = useState([]);

  return (
    <AllChatContext.Provider value={{ allChats, setallChats }}>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/auth" element={<UserAuth />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/groupDetails" element={<GroupDetails/>}/>
          <Route path="/view" element={<ViewImage/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
        </Routes>
      </UserContext.Provider>
    </AllChatContext.Provider>
  );
};

export default App;
