'use client'

import { useMainBanner } from "@/app/store";
import Timer from "../timer";
import ClickButton from "./click-button";
import { useEffect, useState } from "react";

const Banner = () => {
  const { showBanner, setShowBanner } = useMainBanner()
  const [currentMinutem, setCurrentMinute] = useState<number>(new Date().getMinutes())

  // Установка или чтение часа из локалСтораж
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const currentMinutes = currentDate.getMinutes();

      if (currentMinutes % 2 === 0) { // изменить на 15 или 10 , сейчас каждые 2 минуты
        setShowBanner(true);
      }

      setCurrentMinute(currentMinutes);
    }, 60 * 1000);

    // Показать баннер при загрузке страницы
    setShowBanner(true);

    return () => clearInterval(intervalId);
  }, [setShowBanner, setCurrentMinute]);
   // Установка или чтение часа из локалСтораж конец
   

  return(
    <>
      {showBanner && (
        <div className="absolute bottom-0 left-0 w-full h-screen flex flex-col items-center justify-between bg-slate-300 border-[15px] border-[#1A202C] pt-2 pb-8">
          <Timer time={3}/>
          <h2 className="font-semibold text-2xl text-center">
            <p>Давай</p>
            <p>Я тебя</p>
            <p>посчитаю =)</p>
          </h2>
          <ClickButton />
        </div>
      )}
    </>
  )
}
export default Banner;