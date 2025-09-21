import React from 'react'
import UserAuth from './pages/UserAuth'
import ChatPage from './pages/ChatPage'
import {Route,Routes} from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage/>}/>
      <Route path="/auth" element={<UserAuth/>}/>
    </Routes>
  )
}

export default App