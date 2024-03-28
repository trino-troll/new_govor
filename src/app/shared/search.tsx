'use client'
import {Search, X} from 'lucide-react'
import { useSearch } from '../store'
import { findBook } from './action/find-book'
import { useRouter } from 'next/navigation'


export function SearchField() {
  const {textSearch, setTextSearch, bookSearch, setBookSearch} = useSearch()
  const router = useRouter()

  const findedBook = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const res = await findBook(textSearch)
      if (res) {
        setBookSearch(res)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='px-4'>
      <div className='my-2 w-full border-2 rounded-2xl  border-[#1A202C]'>
        <form onSubmit={(e) => findedBook(e)} className='flex justify-between' >
          <input  type="text" 
                  className='text-6 ull mr-4 rounded-2xl outline-none bg-white px-4' 
                  onChange={(e) => setTextSearch(e.target.value)}
                  value={textSearch}
                  placeholder='Введи назание книги'  
                  />
          <div className='flex items-center'>
            {textSearch && (
              <div onClick={() => setTextSearch('')}>
                <X size={30} color='red' />
              </div>
            )}
            <button type='submit' className='ml-2 p-2 pl-3 bg-[#1A202C] rounded-xl'> 
              <Search  size={24} color={'#ffffff'} strokeWidth={3}/>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}