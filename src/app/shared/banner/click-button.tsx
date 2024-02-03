'use client'
import { useEffect, useState } from "react";
import Button from "../Button";
import { useMainBanner } from "@/app/store";


const ClickButton = () => {
  const { setShowBanner } = useMainBanner()
  
  return (
    <div className="w-1/3">
      <Button 
        onClick={() => setShowBanner(false)}
      >Нажми меня</Button>
     </div> 
  )
}
export default ClickButton;