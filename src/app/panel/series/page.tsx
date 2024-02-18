'use client'
import Button from '@/app/shared/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import createSeries from './action/create-series'

const Series = () => {
  const router = useRouter()

  const newSeries = async (data: FormData) => {
    const series = await createSeries(data)

    if (typeof series === 'string') {
      console.log('Не удалось добавить серию', series)
      toast.error(series)
    } else {
      console.log(series)
      toast.success(`Серия ${series.name} создана`)
    }
  }
  return (
    <>
      <div className="text-2xl text-center font-semibold">
        Страница создания серии
      </div>

      <div className="px-4 mt-6">
        <form
          action={newSeries}
          className="border-2 border-[#1A202C] p-2 rounded-xl "
        >
          <div className="flex flex-col px-4">
            <label htmlFor="name">Название серии</label>
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

export default Series
