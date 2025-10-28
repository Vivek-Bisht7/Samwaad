import React from "react";
import {Link} from "react-router-dom";

const UserChat = ({
  chatName,
  latestMessage,
  imageUrl,
  messageTime,
  onClick,
}) => {
  return (
    <>
      <div
        className="h-[60px] w-full rounded px-2 hover:bg-gray-100  flex justify-between items-center"
        onClick={onClick}
      >
        {/* photo , name , message */}
        <div className="flex">
          <div className="h-[7vh] ">
            <Link to="/view" state={{URL:imageUrl}}>
              <img
                src={imageUrl}
                alt="User Image"
                className="h-12 w-12 object-cover rounded-full"
              />
            </Link>
          </div>

          <div className="px-4 flex-1 justify-center flex-col text-gray-800">
            <div className="font-semibold text-md">{chatName}</div>
            {latestMessage?.length > 32 ? (
              <div className="text-sm text-gray-500">
                {latestMessage.slice(0, 26) + "..."}
              </div>
            ) : (
              <div className="text-sm text-gray-500">{latestMessage}</div>
            )}
          </div>
        </div>
        {/* photo , name , message over*/}

        {/*time */}
        <div className="flex flex-col items-end">
          <div className="text-[12px] text-gray-500">{messageTime}</div>
        </div>
        {/*time over*/}
      </div>
    </>
  );
};

export default UserChat;
