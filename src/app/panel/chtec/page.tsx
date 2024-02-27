'use client'
import Button from '@/app/shared/Button'
import { useRouter } from 'next/navigation'
import createChtec from './action/create-chtec'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { getChtecs } from '../book/action/get-data'

interface ChtecType {
  id: number;
  name: string;
}

const Chtec = () => {
  const router = useRouter()
  const [chtecs, setChtecs] = useState<ChtecType[]>([])
  const [filteredChtecs, setFilteredChtecs] = useState<ChtecType[]>([])
  const [findChtec, setFindChtec] = useState<string>('')

  const newChtec = async (data: FormData) => {
    const chtec = await createChtec(data)

    if (typeof chtec === 'string') {
      console.log('Не удалось добавить чтеца', chtec)
      toast.error(chtec)
      router.refresh()
    } else {
      console.log(chtec)
      toast.success(`Чтец ${chtec.name} создан`)
      router.refresh()
    }
  }

  const chtecExists = async () => {
    const res = await getChtecs()
    setChtecs(res)
  }

  const find_chtec = (value: string) => {
    const filteredChtecs = chtecs.filter((item) => item.name.toLowerCase().includes(value))
    setFilteredChtecs(filteredChtecs)
  } 

  useEffect(() => {
    chtecExists();
  }, [])

  useEffect(() => {
    if (findChtec) {
      find_chtec(findChtec)
    } else {
      setFilteredChtecs(chtecs)
    }
  }, [findChtec, chtecs])

  return (
    <>
      <div className="text-2xl text-center font-semibold">
        Страница создания чтеца
      </div>

      <div className="px-4 mt-6">
        <form
          action={newChtec}
          className="border-2 border-[#1A202C] p-2 rounded-xl "
        >
          <div className="flex flex-col px-4">
            <label htmlFor="name">Имя чтеца</label>
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
        <div className='font-semibold text-red-800 text-center'>ПРОВЕРЬ! Возможно такой чтец уже есть!!!</div>
        <input 
          type="text" 
          placeholder='Чтец существует?'
          className='border border-[#1A202C] w-full px-2 py-1 rounded-lg focus:border-2 outline-none'
          onChange={(e) => setFindChtec(e.target.value.toLowerCase())}
        /> 
      </div>

      {chtecs.length > 0 && (
        <div className='text-center'>
          <div className='grid grid-cols-2 gap-2 px-4'>
            {filteredChtecs.map((chtec: ChtecType, i: number) => (
              <div 
                key={chtec.id}
                className='bg-[#1A202C] text-white rounded-md'
              >
                {chtec.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Chtec
