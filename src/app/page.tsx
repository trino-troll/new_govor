import Image from 'next/image'
import Header from './header/page'
import img from '../../public/audiobooks/Атаманов_М_Искажающие_реальность_01/ir1.jpg'
import Link from 'next/link'
import Books from './books/page'

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 px-4">
        <Books />
      </div>
    </>
  )
}
