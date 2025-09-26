import React, { useState } from 'react'
import { ChatContext} from '../contexts/ChatContext'
import Navbar from '../components/Navbar'
import Users from '../components/Users'
import Chat from '../components/Chat'

const ChatPage = () => {

  const [selectedChat, setselectedChat] = useState(null);

  return (
    <ChatContext.Provider value={{selectedChat,setselectedChat}}>
      <div>
        <Navbar/>
        <div className='flex h-[calc(100vh-10vh)] w-[100%] overflow-hidden'>
            <Users/>
            <Chat/>
        </div>
    </div>
    </ChatContext.Provider>
  )
}

export default ChatPage