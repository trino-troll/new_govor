'use client'
import Button from '@/app/shared/Button'
import { useRouter } from 'next/navigation'
import createChtec from './action/create-chtec'
import { toast } from 'react-toastify'

const Chtec = () => {
  const router = useRouter()

  const newChtec = async (data: FormData) => {
    const chtec = await createChtec(data)

    if (typeof chtec === 'string') {
      console.log('Не удалось добавить чтеца', chtec)
      toast.error(chtec)
    } else {
      console.log(chtec)
      toast.success(`Чтец ${chtec.name} создан`)
    }
  }
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
    </>
  )
}

export default Chtec
