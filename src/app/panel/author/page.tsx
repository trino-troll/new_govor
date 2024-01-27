'use client'
import Button from "@/app/shared/Button";
import { useRouter } from 'next/navigation'
import createAuthor from "./action/create-author";
import { toast } from "react-toastify";


const Author = () => {
  const router = useRouter()

  const newAuthor = async (data: FormData) => {
    const author = await createAuthor(data)

    if (typeof(author) === "string") {
      console.log('Не удалось добавить автора')
      toast.error('Не удалось добавить автора')
    } else {
      console.log(author)
      toast.success(`Автор ${author.name} создан`)
    }
  }
  return (
    <>

      <div className="text-2xl text-center font-semibold">
        Страница создания автора
      </div>

      <div className="px-4 mt-6">
        <form
          action={newAuthor}
          className="border-2 border-[#1A202C] p-2 rounded-xl "
        >
          <div className="flex flex-col px-4">
            <label htmlFor="name">Имя автора</label>
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

export default Author;