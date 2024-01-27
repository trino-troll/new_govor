'use client'
import Button from "@/app/shared/Button";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { getAuthors, getChtecs } from "./action/get-data";
import CreateBook from "./action/create-book";

interface AuthorData {
  id: number,
  name: string,
}
interface ChtecData {
  id: number,
  name: string,
}

const Book = () => {
  const router = useRouter()
  const [authors, setAuthors] = useState<AuthorData[]>([])
  const [chtecs, setChtecs ] = useState<ChtecData[]>([])

  const listAuthors = async () => {
    const resAuthor = await getAuthors()
    const resChtec = await getChtecs()
    setAuthors(resAuthor)
    setChtecs(resChtec)
  }

  const newBook = async (data: FormData) => {
    try {
      const res = await CreateBook(data)
      if (res) {
        toast.success(`Книга ${res.name} создана`)
      } else {
        toast.error("Не удалось создать запись книги в БД")
      }
      router.refresh()
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listAuthors()
  }, [])

  return (
    <>
      <div className="text-2xl text-center font-semibold">
        Страница создания книги
      </div>

      <div className="px-4 mt-6">
        <form
          action={newBook}
          className="border-2 border-[#1A202C] p-2 rounded-xl "
        >
          <div className="flex flex-col px-4">
            <div className="flex flex-col px-4">
              <label htmlFor="name">Название книги</label>
              <input 
                type="text" 
                name="name" 
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              />
            </div>

            <div className="flex flex-col px-4 mt-2">
              <label htmlFor="description">Описание</label>
              <textarea name="description" id="" cols={20} rows={4} 
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              ></textarea>
            </div>

            <div className="flex flex-col px-4 mt-2">
              <label htmlFor="imageUrl">Путь до изображения</label>
              <input 
                type="text" 
                name="imageUrl" 
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              />
            </div>
            <div className="flex flex-col px-4 mt-2">
              <input type="file" name="file" />
            </div>

            <div className="flex flex-col px-4 mt-2">
              <label htmlFor="author">Выбери автора</label>
              <select name="author" id=""
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              >
                {authors.map((author: AuthorData) => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col px-4 mt-2">
              <label htmlFor="chtec">Выбери чтеца</label>
              <select name="chtec" id=""
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              >
                {chtecs.map((chtec: ChtecData) => (
                  <option key={chtec.id} value={chtec.id}>{chtec.name}</option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <Button type="submit">Создать</Button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-6 px-4">
        <Button onClick={() => router.back()}>Вернуться</Button>
      </div>
    </>
  )
}
export default Book;