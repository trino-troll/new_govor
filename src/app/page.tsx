import Image from 'next/image'
import Header from './header/page'
import img from '../../public/audiobooks/Атаманов_М_Искажающие_реальность_01/ir1.jpg'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className='text-center'>Это главная страница</div>
      
      <div className='grid grid-cols-2 gap-2 px-4'>
        <Link href={'/book/ghbdtn'}>
          <div className='flex flex-col bg-[#1A202C] rounded-xl overflow-auto'>
            <Image src={img} alt='Изо'/>
            <div className='text-center font-semibold text-white pb-1'>Искажающие реальность</div>
          </div>
        </Link>
      </div>
    </>
  )
  }
