import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [secondsRemaining, setsecondsRemaining] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setsecondsRemaining(prev => {
        if (prev > 0) return prev - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  return <div className='bg-[#FFD166] text-[#212121] rounded-md text-xl font-semibold w-[9vw] h-[6vh] flex items-center justify-center'>
            Timer : {secondsRemaining}
        </div>;
};

export default Timer;
