import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import { useLocation } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

const ViewImage = () => {
  const location = useLocation();
  const { URL } = location.state || "";
console.log(URL);

  return (
    <div>
      <Navbar />
      <div className="flex h-[calc(100vh-8vh)] w-[100%] overflow-hidden">
        <Navbar2 />

        <div className="flex flex-col items-center justify-center h-[100%] w-[100%]">
          <div className="flex w-[60%] justify-end">
            <Link to={"/"}>
              <ImCross className="text-gray-400  hover:text-gray-600 cursor-pointer text-xl m-2" />
            </Link>
          </div>
          <div className="h-[80%] w-[60%] flex justify-center">
            <img
              src={URL}
              alt="Image"
              className="h-[100%] w-fit object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
