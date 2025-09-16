import React from 'react'
import Navbar from '../components/Navbar'
import Users from '../components/Users'
import Chat from '../components/Chat'

const ChatPage = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex h-[calc(100vh-10vh)] w-[100%] overflow-hidden'>
            <Users/>
            <Chat/>
        </div>
    </div>
  )
}

export default ChatPage