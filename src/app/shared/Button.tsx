import React from 'react';

interface ButtonProps {
  children: any, 
  onclick?: () => void,
  classProps?: string
}

const Button: React.FC<ButtonProps> = (
    { children, onclick, classProps }
  ) => {
  return (
    <button 
      className={`w-full py-2 rounded-xl bg-[#1A202C] text-white font-bold ${classProps}`}
      onClick={onclick}  
    >
      {children}
    </button>
  )
}
export default Button;