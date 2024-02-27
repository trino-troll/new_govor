'use client'
import Button from '@/app/shared/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import createGenre from './action/create-genre'
import { useEffect, useState } from 'react'
import { getGenres } from '../book/action/get-data'

interface GenresType {
  id: number;
  name: string;
}

const Genres = () => {
  const [genres, setGenres] = useState<GenresType[]>([]) // список авторов
  const [filteredGenres, setFilteredGenres] = useState<GenresType[]>([])
  const [findGenre, setFindGenre] = useState<string>('')
  const router = useRouter()

  const genreExists = async () => {
    const res = await getGenres()
    setGenres(res)
  } 

  const newGenre = async (data: FormData) => {
    const genre = await createGenre(data)

    if (typeof genre === 'string') {
      console.log('Не удалось добавить автора', genre)
      toast.error(genre)
      router.refresh()
    } else {
      console.log(genre)
      toast.success(`Автор ${genre.name} создан`)
      router.refresh()
    }
  }

  const find_genre = (value: string) => {
    const filteredGenres = genres.filter((item) => item.name.toLowerCase().includes(value))
    setFilteredGenres(filteredGenres)
  } 

  useEffect(() => {
    genreExists();
  }, [])

  useEffect(() => {
    if (findGenre) {
      find_genre(findGenre)
    } else {
      setFilteredGenres(genres)
    }
  }, [findGenre, genres])

  return (
    <>
      <div className="text-2xl text-center font-semibold">
        Страница создания жанра
      </div>

      <div className="px-4 mt-6">
        <form
          action={newGenre}
          className="border-2 border-[#1A202C] p-2 rounded-xl "
        >
          <div className="flex flex-col px-4">
            <label htmlFor="name">Название жанра</label>
            <input
              type="text"
              name="name"
              className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg"
            />
            <div className="mt-6">
              <Button type="submit">Создать</Button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-6 px-4">
        <Button onClick={() => router.back()}>Вернуться</Button>
      </div>

      <div className='mt-4 mb-2 px-4'>
        <div className='font-semibold text-red-800 text-center'>ПРОВЕРЬ! Возможно такой жанр уже есть!!!</div>
        <input 
          type="text" 
          placeholder='Автор существует?'
          className='border border-[#1A202C] w-full px-2 py-1 rounded-lg focus:border-2 outline-none'
          onChange={(e) => setFindGenre(e.target.value.toLowerCase())}
        /> 
      </div>

      {genres.length > 0 && (
        <div className='text-center'>
          <div className='grid grid-cols-2 gap-2 px-4'>
            {filteredGenres.map((genre: GenresType, i: number) => (
              <div 
                key={genre.id}
                className='bg-[#1A202C] text-white rounded-md'
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Genres
