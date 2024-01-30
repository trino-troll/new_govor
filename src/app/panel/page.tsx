'use client'
import Link from "next/link";
import Button from "../shared/Button";
import AuthPatriarch from "../shared/auth-form";
import { useState } from "react";


const Panel = () => {
  const [patriarch, setPatriarch] = useState<boolean>(false)
  
  return (
    <>
      <AuthPatriarch />
      {patriarch && (
        <>
          <h2 className="text-2xl text-center font-semibold mb-4">Создать новый экземпляр</h2>
          <div className="flex flex-col justify-center px-8">
            <Link href={'/panel/author'} className="mb-4">
              <Button>Автора</Button>
            </Link>
            <Link href={'/panel/chtec'} className="mb-4">
              <Button >Чтеца</Button>
            </Link>
            <Link href={'/panel/book'} className="mb-4">
                <Button>Книги</Button>
            </Link>
            <Link href={'/panel/audioFile'} className="mb-4">
                <Button>Аудиофайла</Button>
            </Link>
            <Link href={'/panel/series'} className="mb-4" >
                <Button>Серии</Button>
            </Link>
            <Link href={'/panel/genres'} >
                <Button>Жанров</Button>
            </Link>
          </div>
        </>
      )}
    </>
  )
}
export default Panel;