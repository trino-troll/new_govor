import Image from "next/image";
import Logo from '../../../public/Logo-white.svg'
import Link from "next/link";
const Header = () => {

  return (
    <div className="flex justify-between items-center py-1 px-6 bg-green-600 mb-[20px]">
      <Link href={'/'}>
        <h1 className="font-semibold text-[30px] text-white">ChatterBox</h1>
      </Link>
      <div className="w-[70px] h-[70px]">
        <Image 
          src={Logo}
          alt="ChatterBox - лучшая аудиокнига"
        ></Image>
      </div>
    </div>
  )
}
export default Header;