import React from "react";

const UserChat = ({ chatName, latestMessage, imageUrl , onClick }) => {

   console.log(imageUrl);

  return (
    <>
      
      <div
        className="h-[12vh] w-full rounded px-2 hover:bg-gray-100 py-2 flex justify-between items-center"
        onClick={onClick}
      >
        {/* photo , name , message */}
        <div className="flex">
          <div className="h-[7vh] ">
            <img
              src={imageUrl}
              alt="User Image"
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>

          <div className="px-4 flex-1 justify-center flex-col text-gray-800">
            <div className="font-semibold text-md">{chatName}</div>
            <div className="text-sm text-gray-500">{latestMessage}</div>
          </div>
        </div>
        {/* photo , name , message over*/}

        {/* notification and time */}
        <div className="flex flex-col items-end">
          <div>
            <div className="text-[12px] text-gray-500">7:45 AM</div>
          </div>
          <div>
            <div className="rounded-full bg-[#4CAF93] h-5 w-5 flex items-center justify-center text-white font-semibold text-[12px] mt-1">
              1
            </div>
          </div>
        </div>
        {/* notification and time over*/}
      </div>
    </>
  );
};

export default UserChat;
