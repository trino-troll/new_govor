'use client'
import Button from '@/app/shared/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import createSeries from './action/create-series'
import { useEffect, useState } from 'react'
import { getSeries } from '../book/action/get-data'

interface SeriesType {
  id: number;
  name: string;
}

const Series = () => {
  const [series, setSeries] = useState<SeriesType[]>([]) // список авторов
  const [filteredSeries, setFilteredSeries] = useState<SeriesType[]>([])
  const [findSeries, setFindSeries] = useState<string>('')
  const router = useRouter()

  const authorSeries = async () => {
    const res = await getSeries()
    setSeries(res)
  } 

  const newSeries = async (data: FormData) => {
    const series = await createSeries(data)

    if (typeof series === 'string') {
      console.log('Не удалось добавить серию', series)
      toast.error(series)
      router.refresh()
    } else {
      console.log(series)
      toast.success(`Серия ${series.name} создана`)
      router.refresh()
    }
  }

  const find_series = (value: string) => {
    const findSeries = series.filter((item) => item.name.toLowerCase().includes(value))
    setFilteredSeries(findSeries)
  }

  useEffect(() => {
    authorSeries();
  }, [])

  useEffect(() => {
    if (findSeries) {
      find_series(findSeries)
    } else {
      setFilteredSeries(series)
    }
  }, [findSeries, series])

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

      <div className='mt-4 mb-2 px-4'>
        <div className='font-semibold text-red-800 text-center'>ПРОВЕРЬ! Возможно такая серия уже есть!!!</div>
        <input 
          type="text" 
          placeholder='Автор существует?'
          className='border border-[#1A202C] w-full px-2 py-1 rounded-lg focus:border-2 outline-none'
          onChange={(e) => setFindSeries(e.target.value.toLowerCase())}
        /> 
      </div>

      {series.length > 0 && (
        <div className='text-center'>
          <div className='grid grid-cols-2 gap-2 px-4'>
            {filteredSeries.map((serei: SeriesType, i: number) => (
              <div 
                key={serei.id}
                className='bg-[#1A202C] text-white rounded-md'
              >
                {serei.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Series
