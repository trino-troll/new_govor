'use client'
import getAudioForBook from '@/app/books/[slug]/action/get-auido-for-book'
import Button from '@/app/shared/Button'
import { AudiofilesType, BookData } from '@/app/shared/_model/interface'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getBooks } from '../book/action/get-data'
import createAudioFiles from './action/create-audio-files'
import ListExistsAudio from './components/list-exists-audio'

const AudioFile = () => {
  const [books, setBooks] = useState<BookData[]>([])
  const addAudioFiles = useRef<HTMLInputElement | null>(null)
  const [counterFiles, setCounterFiles] = useState<number>(0)
  const router = useRouter()
  const [audiofiles, setAudiofiles] = useState<AudiofilesType[]>([])
  const [bookId, setBookId] = useState<number | null>(null)
  const [namesFiles, setNamesFiles] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const newAudioFile = async (data: FormData) => {
    const audioFile = await createAudioFiles(data)

    if (audioFile && audioFile.includes('Успех')) {
      toast.success(audioFile, { autoClose: 3000 })
      if (bookId) {
        currentAddAudio(bookId)
      }
      setIsLoaded(false)
      router.refresh()
    } else if (audioFile && audioFile.includes('Ошибка')) {
      toast.error(audioFile, { autoClose: 5000 })
    } else {
      toast.warning('Что-то пошло не так. Посмотри логи.', { autoClose: 3000 })
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
      const tmpArrFiles = Array.from(files)
      let tmpArrNames: any[] = []
      tmpArrFiles.map((file: any) => {
        tmpArrNames.push(file.name)
      })
      setNamesFiles(tmpArrNames)
    }
  }

  useEffect(() => {
    handleBooks()
  }, [])

  async function currentAddAudio(id: number) {
    const res = await getAudioForBook(id)
    if (typeof res === 'string') {
      return
    } else {
      setAudiofiles(res)
    }
  }
  useEffect(() => {
    if (bookId) {
      currentAddAudio(bookId)
    }
  }, [bookId])

  const handleAddAudio = () => {
    setIsLoaded(true)
  }

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
            <select
              name="book"
              id=""
              className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              onChange={(e) => setBookId(+e.target.value)}
            >
              <option value=""></option>
              {books.map((book: BookData) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </select>
          </div>

          <div className="px-4 mt-3">
            <Button onClick={handleAddAudioFiles}>
              Добавить аудиофаил(ы)({counterFiles})
            </Button>
            {namesFiles && (
              <div>
                {namesFiles.map((item: string, i: number) => (
                  <span key={i}>{item}, </span>
                ))}
              </div>
            )}
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
            <Button
              type="submit"
              onClick={handleAddAudio}
              classProps={`${isLoaded ? 'bg-red-600' : ''}`}
            >
              {isLoaded ? 'Загружается...' : 'Добавить'}
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-6 px-4">
        <Button onClick={() => router.back()}>Вернуться</Button>
      </div>

      {audiofiles && audiofiles.length > 0 && (
        <ListExistsAudio audiofiles={audiofiles} />
      )}
    </>
  )
}
export default AudioFile
