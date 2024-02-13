'use client'
import Button from '@/app/shared/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import createGenre from './action/create-genre'

const Genres = () => {
  const router = useRouter()

  const newGenre = async (data: FormData) => {
    const genre = await createGenre(data)

    if (typeof genre === 'string') {
      console.log('Не удалось добавить автора')
      toast.error('Не удалось добавить автора')
    } else {
      console.log(genre)
      toast.success(`Автор ${genre.name} создан`)
    }
  }
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
    </>
  )
}

export default Genres
