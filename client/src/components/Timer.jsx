import React, { useEffect, useState } from "react";

const Timer = () => {
  const [duration, setduration] = useState(1000*60*5);
  
  useEffect(() => {
    setTimeout(() => {
      if(duration>0) setduration(duration-1000);
    }, 1000);

  }, [duration])
  
  const formattedTime = ()=>{
    const seconds = parseInt(Math.floor(duration/1000));
    const minutes = parseInt(Math.floor(seconds/60));

    return `${minutes.toString().padStart(2,"0")}:${(seconds%60).toString().padStart(2,"0")}`
  }
  

  return (
    <div className="bg-[#FFD166] text-[#212121] rounded-md text-xl font-semibold w-[18vw] h-[6vh] flex items-center justify-center">
      {formattedTime()}
    </div>
  );
};

export default Timer;
