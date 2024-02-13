import React from 'react'

interface ButtonProps {
  children: any
  onClick?: () => void
  classProps?: string
  type?: 'submit' | 'button'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  classProps,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      className={`w-full py-2 rounded-xl bg-[#1A202C] text-white font-bold ${classProps}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button
