'use client'
import Button from "@/app/shared/Button";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { getBooks } from "../book/action/get-data";
import createAudioFiles from "./action/create-audio-files";

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
  const addAudioFiles = useRef<HTMLInputElement | null>(null)
  const [counterFiles, setCounterFiles] = useState<number>(0)
  const router = useRouter()

  const newAudioFile = async (data: FormData) => {
    const audioFile = await createAudioFiles(data)

    if (audioFile && audioFile.includes('Успех')) {
      toast.success(audioFile, {autoClose: 3000})
    } else if (audioFile && audioFile.includes('Ошибка')) {
      toast.error(audioFile, {autoClose: 5000})
    } else {
      toast.warning('Что-то пошло не так. Посмотри логи.', {autoClose: 3000})
    }
    router.refresh()
  }

  const handleBooks = async () => {
    const resBooks = await getBooks()
    setBooks(resBooks)
  }

  const handleAddAudioFiles = () => {
    if (addAudioFiles.current) {
      addAudioFiles.current.click()
    }
  }

  const handleCounterFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setCounterFiles(files.length)
    }
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

          <div className="px-4 mt-3">
              <Button onClick={handleAddAudioFiles}>Добавить аудиофаил(ы)({counterFiles})</Button>
          </div>

          <div className="hidden">
            <input 
              type="file" 
              name="audioFiles" 
              accept="audio/*"
              multiple
              ref={addAudioFiles}
              onChange={handleCounterFiles}
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