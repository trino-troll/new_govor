'use client'
import Link from "next/link";
import Button from "../shared/Button";


const Panel = () => {
  
  return (
    <>
      <h2 className="text-2xl text-center font-semibold mb-4">Создать новый экземпляр</h2>
      <div className="flex flex-col justify-center px-8">
        <Link href={'#'} className="mb-4">
          <Button>Автора</Button>
        </Link>
        <Link href={'#'} className="mb-4">
          <Button >Чтеца</Button>
        </Link>
        <Link href={'#'} className="mb-4">
            <Button>Книгу</Button>
        </Link>
        <Link href={'#'} >
            <Button>Аудиофайлы</Button>
        </Link>
      </div>
    </>
  )
}
export default Panel;