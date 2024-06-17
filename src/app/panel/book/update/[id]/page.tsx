'use client'
import { toast } from "react-toastify"
import getBookId from "../../action/get-book-id"
import { useEffect, useRef, useState } from "react"
import Button from "@/app/shared/Button"
import { getAuthors, getChtecs, getGenres, getSeries } from "../../action/get-data"
import Image from "next/image"
import { updateBook } from "../../action/create-book"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Props = {
  params: {
    id: string
  }
}

interface CurrentBook {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  chtecId: number;
  authorID: number;
  seriesId: number | null;
  genreId: number | null;
}

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

const UpdateBookId = ({params: { id }}: Props) => {
  const [currentBook, setCurrentBook] = useState<CurrentBook>()
  const [authors, setAuthors] = useState<AuthorData[]>([])
  const [chtecs, setChtecs] = useState<ChtecData[]>([])
  const [series, setSeries] = useState<SeriesData[]>([])
  const [genres, setGenres] = useState<GenreData[]>([])
  const addImage = useRef<HTMLInputElement | null>(null)
  const [currentFileName, setCurrentFileName] = useState<string>('')
  const [changeTitle, setChangeTitle] = useState<string>('')
  const [changeDesc, setChangeDesc] = useState<string>('')
  const router = useRouter()

  const handleGetBook = async () => {
    try {
      const book = await getBookId(+id)
      if (book) {
        setCurrentBook(book)
      }
     
    } catch(error) {
      console.log(error)
      toast.error('Не получилось получить книгу. Смотри в консоль')
    }
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

  const handleAddImage = () => {
    if (addImage.current) {
      addImage.current.click()
    }
  }

  function handleUpdateImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files
    if (file) {
      setCurrentFileName(file[0].name)
    }
  }

  const updateBookId = async (data: FormData) => {
    try {
      const res = await updateBook(data, id)
      toast.success(`Книга ${res.name} обновлена.`)
      router.refresh()
    } catch (error) {
      toast.error('Сообщи программисту!')
    }
  }

  useEffect(() => {
    handleGetBook()
    listAuthors()
  }, [])
  return (
    <>
      <Link href={'/panel'} className="flex">
        <Button classProps="mx-8">Вернуться в админку</Button>
      </Link>
      <h2 className="text-center text-xl font-semibold">Редактирование книги</h2>
      {currentBook && (
        <div className="px-4 mt-6">
          <h2 className="text-center text-xl font-semibold">{currentBook.name}</h2>
          <form
            action={updateBookId}
            className="border-2 border-[#1A202C] p-2 rounded-xl "
          >
            <div className="flex flex-col px-4">
              <div className="flex flex-col px-4">
                <label htmlFor="name">Название книги</label>
                <input
                  type="text"
                  name="name"
                  className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
                  value={changeTitle || currentBook.name}
                  onChange={(e) => setChangeTitle(e.target.value)}
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
                  value={changeDesc || currentBook.description}
                  onChange={(e) => setChangeDesc(e.target.value)}
                ></textarea>
              </div>

              <div className="hidden">
                <input type="file" name="file" ref={addImage} accept="image/*" onChange={handleUpdateImage}/>
              </div>

              <div className="flex justify-center mt-2">
                {/* <Image src={currentBook.imageUrl} alt="Установленное изо" width={100} height={100}/> */}
              </div>
              <div className="px-4 mt-3">
                <Button onClick={handleAddImage}>Добавить изображение</Button>
                {currentFileName && (
                  <div>{currentFileName}</div>
                )}
              </div>

              {authors && (
                <div className="flex flex-col px-4 mt-2">
                  <label htmlFor="author">Выбери автора</label>
                  <select
                    name="author"
                    id=""
                    className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
                  >
                    {authors.map((author: AuthorData) => (
                      <option key={author.id} value={author.id} 
                        selected={currentBook?.authorID === author.id}
                      >
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {chtecs && (
                <div className="flex flex-col px-4 mt-2">
                  <label htmlFor="chtec">Выбери чтеца</label>
                  <select
                    name="chtec"
                    id=""
                    className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
                  >
                    {chtecs.map((chtec: ChtecData) => (
                      <option key={chtec.id} value={chtec.id}
                        selected={chtec.id === currentBook.chtecId}
                      >
                        {chtec.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {series && (
                <div className="flex flex-col px-4 mt-2">
                  <label htmlFor="series">Выбери серию</label>
                  <select
                    name="series"
                    id=""
                    className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
                  >
                    <option value=""></option>
                    {series.map((serie: SeriesData) => (
                      <option key={serie.id} value={serie.id}
                        selected={serie.id === currentBook.seriesId}
                      >
                        {serie.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {genres && (
                <div className="flex flex-col px-4 mt-2">
                  <label htmlFor="genre">Выбери жанр</label>
                  <select
                    name="genre"
                    id=""
                    className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
                  >
                    <option value=""></option>
                    {genres.map((genre: GenreData) => (
                      <option key={genre.id} value={genre.id}
                        selected={genre.id === currentBook.genreId}
                      >
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-6">
                <Button type="submit">Создать</Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
export default UpdateBookId;