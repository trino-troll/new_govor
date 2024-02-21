'use client'
import React, { useState, useEffect } from 'react'
import CrossClosa from '../../../public/cross_close.svg'
import Image from 'next/image'
import { useMainBanner } from '../store'
import { countClick } from './banner/action/count-click'

type Props = {
  time: number
}

const Timer = ({ time }: Props) => {
  const [seconds, setSeconds] = useState(time)
  const { setShowBanner, setIsDisabledMainBtn } = useMainBanner()

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
    if (seconds === 0) {
      setIsDisabledMainBtn(false)
    }
  }, [seconds])

  const handleCounterMain = () => {
    setShowBanner(false)
    countClick('main')
  }

  return (
    <div className="flex justify-between items-center w-full px-4 font-semibold">
      <div>ChatterBox v.1.0.0</div>
      <div>
        {seconds > 0 ? (
          <div className="flex justify-center items-center w-[40px] h-[40px] bg-white rounded-full">
            {seconds}
          </div>
        ) : (
          <div
            className="flex justify-center items-center w-[40px] h-[40px] bg-white rounded-full cursor-pointer"
            onClick={handleCounterMain}
          >
            <Image src={CrossClosa} alt="Закрыть рекламный баннер" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Timer
