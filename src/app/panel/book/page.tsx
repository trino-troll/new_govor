'use client'
import Button from '@/app/shared/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useEffect, useRef, useState } from 'react'
import { getAuthors, getBooks, getChtecs, getGenres, getSeries } from './action/get-data'
import { CreateBook } from './action/create-book'
import { Pencil } from 'lucide-react'
import Link from 'next/link'

interface AuthorData {
  id: number
  name: string
}
interface ChtecData {
  id: number
  name: string
}
interface SeriesData {
  id: number
  name: string
}
interface GenreData {
  id: number
  name: string
}
interface BookType {
  id: number
  name: string
}

const Book = () => {
  const router = useRouter()
  const [authors, setAuthors] = useState<AuthorData[]>([])
  const [chtecs, setChtecs] = useState<ChtecData[]>([])
  const [series, setSeries] = useState<SeriesData[]>([])
  const [genres, setGenres] = useState<GenreData[]>([])
  const addImage = useRef<HTMLInputElement | null>(null)
  const [books, setBooks] = useState<BookType[]>([])
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([])
  const [findBooks, setFindBooks] = useState<string>('')
  const [showCreatePanel, setShowCreatePanel] = useState<boolean>(false)

  const bookExists = async () => {
    const res = await getBooks()
    setBooks(res)
  } 

  const listAuthors = async () => {
    const resAuthor = await getAuthors()
    const resChtec = await getChtecs()
    const resSeries = await getSeries()
    const resGenres = await getGenres()
    setAuthors(resAuthor)
    setChtecs(resChtec)
    setSeries(resSeries)
    setGenres(resGenres)
  }

  const newBook = async (data: FormData) => {
    try {
      const res = await CreateBook(data)
      console.log(data.get('file'))
      if (res === 'Такая книга уже есть') {
        toast.error(res)
      } else if (res.name){
        toast.success(`Книга ${res.name} создана`)
        router.refresh()
      } else {
        toast.error('Не удалось создать книгу')
      }
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddImage = () => {
    if (addImage.current) {
      addImage.current.click()
    }
  }

  const find_book = (value: string) => {
    const filteredBooks = books.filter((item) => item.name.toLowerCase().includes(value))
    setFilteredBooks(filteredBooks)
  }

  useEffect(() => {
    listAuthors()
    bookExists()
  }, [])

  useEffect(() => {
    if (findBooks) {
      find_book(findBooks)
    } else {
      setFilteredBooks(books)
    }
  }, [findBooks, books])

  return (
    <>
      <div className="text-2xl text-center font-semibold">
        Страница создания книги
      </div>
      <div className='px-4'>
        <Button
          onClick={() => setShowCreatePanel(!showCreatePanel)}
        >{showCreatePanel ? 'Скрыть панель' : 'Открыть панель'}</Button>
      </div>
      {showCreatePanel && (
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
              <textarea
                name="description"
                id=""
                cols={20}
                rows={4}
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              ></textarea>
            </div>

            <div className="hidden">
              <input type="file" name="file" ref={addImage} accept="image/*" />
            </div>

            <div className="px-4 mt-3">
              <Button onClick={handleAddImage}>Добавить изображение</Button>
            </div>

            <div className="flex flex-col px-4 mt-2">
              <label htmlFor="author">Выбери автора</label>
              <select
                name="author"
                id=""
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              >
                {authors.map((author: AuthorData) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col px-4 mt-2">
              <label htmlFor="chtec">Выбери чтеца</label>
              <select
                name="chtec"
                id=""
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              >
                {chtecs.map((chtec: ChtecData) => (
                  <option key={chtec.id} value={chtec.id}>
                    {chtec.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col px-4 mt-2">
              <label htmlFor="series">Выбери серию</label>
              <select
                name="series"
                id=""
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              >
                <option value=""></option>
                {series.map((chtec: ChtecData) => (
                  <option key={chtec.id} value={chtec.id}>
                    {chtec.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col px-4 mt-2">
              <label htmlFor="genre">Выбери жанр</label>
              <select
                name="genre"
                id=""
                className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
              >
                <option value=""></option>
                {genres.map((chtec: ChtecData) => (
                  <option key={chtec.id} value={chtec.id}>
                    {chtec.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <Button type="submit">Создать</Button>
            </div>
          </div>
        </form>
      </div>
      )}
      

      <div className="mt-6 px-4">
        <Button onClick={() => router.back()}>Вернуться</Button>
      </div>

      <div className='mt-4 mb-2 px-4'>
        <div className='font-semibold text-red-800 text-center'>ПРОВЕРЬ! Возможно такая книга уже есть!!!</div>
        <input 
          type="text" 
          placeholder='Автор существует?'
          className='border border-[#1A202C] w-full px-2 py-1 rounded-lg focus:border-2 outline-none'
          onChange={(e) => setFindBooks(e.target.value.toLowerCase())}
        /> 
      </div>

      {books.length > 0 && (
        <div className='text-center'>
          <div className='grid grid-cols-2 gap-2 px-4'>
            {filteredBooks.map((book: BookType, i: number) => (
              <div 
                key={book.id}
                className='bg-[#1A202C] text-white rounded-md relative'
              >
                {book.name}
                <Link href={`/panel/book/update/${book.id}`} className='absolute bottom-1 right-1'><Pencil size={16}/></Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
export default Book
