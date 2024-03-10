'use client'
import Image from 'next/image'
import Logo from '../../../public/Logo-white.svg'
import Link from 'next/link'
import BannerFreand from '../shared/banner/banner-freand'
import { useState } from 'react'
const Header = () => {
  const [showBannerFreand, setShowBannerFreand] = useState<boolean>(false)

  return (
    <>
      <div className='mb-5 sticky top-0 z-10'>
        <div className=" flex justify-between items-center py-1 px-6 bg-[#1A202C] ">
          <Link href={'/'}>
            <h1 className="font-semibold text-[30px] text-white">ChatterBox</h1>
          </Link>
          <button 
            className="w-[70px] h-[70px]" 
            onClick={() => setShowBannerFreand(!showBannerFreand)}
          >
            <Image src={Logo} alt="ChatterBox - лучшая аудиокнига"></Image>
          </button>
        </div>
        {showBannerFreand && <BannerFreand />}
      </div>
    </>
  )
}
export default Header
