'use client'

import { useMainBanner } from '@/app/store'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Timer from '../timer'
import { countClickToMain } from './action/count-click'
import ClickButton from './click-button'
const kum = '/banner-kum.png'
const sanich = '/banner-sanich.png'

const Banner = () => {
  const { showBanner, setShowBanner } = useMainBanner()
  const [currentMinutem, setCurrentMinute] = useState<number>(
    new Date().getMinutes(),
  )
  const [count, setCount] = useState<any>()

  // Установка или чтение часа из локалСтораж
  useEffect(() => {
    const intervalId = setInterval(
      () => {
        const currentDate = new Date()
        const currentMinutes = currentDate.getMinutes()

        if (currentMinutes % 15 === 0) {
          setShowBanner(true)
        }

        setCurrentMinute(currentMinutes)
      },
      15 * 60 * 1000,
    )

    // Показать баннер при загрузке страницы
    setShowBanner(true)

    return () => clearInterval(intervalId)
  }, [setShowBanner, setCurrentMinute])
  // Установка или чтение часа из локалСтораж конец

  useEffect(() => {
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      if (showBanner) {
        e.preventDefault()
      }
    }
    document.addEventListener('wheel', handleScroll, { passive: false })
    document.addEventListener('touchmove', handleScroll, { passive: false })
    return () => {
      document.removeEventListener('wheel', handleScroll)
      document.removeEventListener('touchmove', handleScroll)
    }
  }, [showBanner])

  const counter = async () => {
    const res = await countClickToMain()
    if (res !== undefined) {
      setCount(res)
    }
  }

  useEffect(() => {
    counter()
  }, [])

  return (
    <>
      {showBanner && (
        <div className="fixed top-0 left-0 z-50 w-full h-screen flex flex-col items-center justify-around bg-slate-300 border-[15px] border-[#1A202C] pt-2 pb-8">
          <Timer time={3} />
          {count && count.day % 2 === 1 && (
            <a href={'https://dvernichok.ru/'} target="_blank">
              <div className="w-full max-w-[400px]">
                <Image
                  src={kum}
                  alt="Магазин дверей Дверничок"
                  width={800}
                  height={800}
                />
              </div>
            </a>
          )}
          {count && count.day % 2 === 0 && (
            <a href={'https://www.estetika52.ru/'} target="_blank">
              <div className="w-full max-w-[400px]">
                <Image
                  src={sanich}
                  alt="Магазин дверей Эстетика дверей"
                  width={800}
                  height={800}
                />
              </div>
            </a>
          )}
          <ClickButton />
          {count && (
            <div className="w-full flex justify-between px-8">
              <p>{count.day}</p>
              <p>{count.total}</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
export default Banner
