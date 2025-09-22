import React from 'react'
import axios from '../utils/axios'

const Navbar = () => {

  const logoutHandler = ()=>{
    axios.post("/user/logout")
    .then(function(res){
      window.location.href = "/auth";
      console.log(res.data);
    })
    .catch(function(err){
      console.error(err);
    })
}

  return (
    <nav className='flex items-center justify-between px-4 text-3xl text-[#FAFAFA] bg-[#4CAF93] min-h-[8vh] shadow-2xl shadow-[#4CAF93]'>
        SAMWAAD

        <button className='text-sm font-semibold cursor-pointer hover:font-bold' onClick={logoutHandler}>LOGOUT</button>
    </nav>
  )             
}

export default Navbar