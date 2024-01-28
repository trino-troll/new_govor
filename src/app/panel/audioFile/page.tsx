'use client'
import Button from "@/app/shared/Button";
import { useRouter } from 'next/navigation'
// import createAuthor from "./action/create-author";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getBooks } from "../book/action/get-data";

interface BookData {
  id: number;
  name: string;
  slug: string | null;
  description: string;
  imageUrl: string;
  chtecId: number;
  authorID: number;
  seriesId: number | null;
  genreId: number | null;
}

const AudioFile = () => {
  const [books, setBooks] = useState<BookData[]>([])
  const router = useRouter()

  const newAudioFile = async (data: FormData) => {
    console.log(data.get('audioFiles'))
    // const audioFile = await createAudioFile(data)

    // if (typeof(audioFile) === "string") {
    //   console.log('Не удалось добавить автора')
    //   toast.error('Не удалось добавить автора')
    // } else {
    //   console.log(audioFile)
    //   toast.success(`Автор ${audioFile.name} создан`)
    // }
  }

  const handleBooks = async () => {
    const resBooks = await getBooks()
    setBooks(resBooks)
  }

  useEffect(() => {
    handleBooks()
  }, [])

  return (
    <>

      <div className="text-2xl text-center font-semibold">
        Страница добавления аудиофайлов
      </div>

      <div className="px-4 mt-6">
        <form
          action={newAudioFile}
          className="border-2 border-[#1A202C] p-2 rounded-xl "
        >
          <div className="flex flex-col px-4 mt-2">
            <label htmlFor="boor">Выбери книгу</label>
            <select name="book" id=""
              className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
            >
              {books.map((book: BookData) => (
                <option key={book.id} value={book.id}>{book.name}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <input 
              type="file" 
              name="audioFiles" 
              accept="audio/*"
            />
          </div>

          <div className="mt-6">
            <Button type="submit">Создать</Button>
          </div>
        </form>
      </div>

      <div className="mt-6 px-4">
        <Button onClick={() => router.back()}>Вернуться</Button>
      </div>
    </>
  )
}
export default AudioFile;