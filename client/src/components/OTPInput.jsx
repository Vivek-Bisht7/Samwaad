import React, { useEffect, useRef, useState } from 'react'

const OTPInput = () => {
   const OTPSize = 4;

   const [otpValue, setotpValue] = useState(new Array(OTPSize).fill(""))

   const inputRefs = useRef([]);

   useEffect(() => {
       setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 0);
   }, [])
   

   const inputChangeHandler = (value,index)=>{
        if(isNaN(value)) return;
        
        const newArr = [...otpValue];

        value = value.trim().slice(-1);

        newArr[index] = value;

        setotpValue(newArr);

        value && inputRefs.current[index+1]?.focus();
   }

   const onKeyDownHandler = (e,index)=>{
      if(!e.target.value && e.code==="Backspace"){
        inputRefs.current[index-1]?.focus();
      }
      
   }

  return (
    <div>
        {otpValue.map((input,index)=>(
            <input key={index} type="text" className='border rounded-md w-[3vw] h-[3vw] bg-[#4CAF93] text-[#FAFAFA] outline-none font-bold text-center' value={otpValue[index]} onChange={(e)=>inputChangeHandler(e.target.value,index)}
            ref={(element) => inputRefs.current[index] = element}
            onKeyDown={(e)=>{onKeyDownHandler(e,index)}}
            />
        ))}
    </div>
  )
}

export default OTPInput