import React from 'react'

const UserChat = () => {
  return (
    <>
        <div className="h-[12vh] w-full rounded px-2 hover:bg-gray-200 py-2 flex">
            <div className="h-[9vh] ">
                <img src="/public/Images/userImage.webp" alt="User Image" className="h-full rounded-full"/>
            </div>

            <div className="px-4 flex-1 justify-center flex-col">
                <div className="font-semibold text-md">
                    Vivek Bisht
                </div>
                <div className="text-sm">
                    Hello kya kar rahe ho..?
                </div>
            </div>
        </div>
    </>
  )
}

export default UserChat