'use client'
import Button from '@/app/shared/Button'
import { useRouter } from 'next/navigation'
import createAuthor from './action/create-author'
import { toast } from 'react-toastify'
import { getAuthors } from '../book/action/get-data'
import { useEffect, useState } from 'react'

interface AuthorType {
  id: number;
  name: string;
}

const Author = () => {
  const [authors, setAuthors] = useState<AuthorType[]>([]) // список авторов
  const [filtered_authors, setFilteredAuthors] = useState<AuthorType[]>([])
  const [findAuthor, setFindAuthor] = useState<string>('')
  const router = useRouter()

  const authorExists = async () => {
    const res = await getAuthors()
    setAuthors(res)
  } 

  const newAuthor = async (data: FormData) => {
    const author = await createAuthor(data)

    if (typeof author === 'string') {
      console.log('Не удалось добавить автора', author)
      toast.error(author)
      router.refresh()
    } else {
      console.log(author)
      toast.success(`Автор ${author.name} создан`)
      router.refresh()
    }
  }

  const find_author = (value: string) => {
    const filtered_autors = authors.filter((item) => item.name.toLowerCase().includes(value))
    setFilteredAuthors(filtered_autors)
  } 

  useEffect(() => {
    authorExists();
  }, [])

  useEffect(() => {
    if (findAuthor) {
      find_author(findAuthor)
    } else {
      setFilteredAuthors(authors)
    }
  }, [findAuthor, authors])
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

      <div className='mt-4 mb-2 px-4'>
        <div className='font-semibold text-red-800 text-center'>ПРОВЕРЬ! Возможно такой автор уже есть!!!</div>
        <input 
          type="text" 
          placeholder='Автор существует?'
          className='border border-[#1A202C] w-full px-2 py-1 rounded-lg focus:border-2 outline-none'
          onChange={(e) => setFindAuthor(e.target.value.toLowerCase())}
        /> 
      </div>

      {authors.length > 0 && (
        <div className='text-center'>
          <div className='grid grid-cols-2 gap-2 px-4'>
            {filtered_authors.map((author: AuthorType, i: number) => (
              <div 
                key={author.id}
                className='bg-[#1A202C] text-white rounded-md'
              >
                {author.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Author
