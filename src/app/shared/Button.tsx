import React from 'react';

interface ButtonProps {
  children: any, 
  onClick?: () => void,
  classProps?: string
  type?: 'submit' | 'button'
}

const Button: React.FC<ButtonProps> = (
    { children, onClick, classProps, type = 'button' }
  ) => {
  return (
    <button 
      className={`w-full py-2 rounded-xl bg-[#1A202C] text-white font-bold ${classProps}`}
      onClick={onClick}
      type={type} 
    >
      {children}
    </button>
  )
}
export default Button;