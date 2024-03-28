'use client'
import Link from 'next/link'
import getNameImgBooks from './action/get-name-img-books'
import Image from 'next/image'
import { useSearch } from '../store'
import { useEffect, useState } from 'react'

interface MainBook {
  name: string
  slug: string | null
  imageUrl: string
}

const Books = () => {

  const [books, setBooks] = useState<MainBook[]>([])
  const { bookSearch } = useSearch()
  const getBooksAll = async () => {
    try {
      const booksArr = await getNameImgBooks()
      if (booksArr) {
        setBooks(booksArr)
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBooksAll()
  }, [])

  useEffect(() => {
    if (bookSearch) {
      setBooks(bookSearch)
    } else {
      getBooksAll()
    }
  }, [bookSearch])

  if (books.length === 0) return <div className='text-2xl w-full text-center'>Ничего не найдено <span>🤷‍♀️</span></div>

  return (
    <>
      <div className="grid grid-cols-2 gap-4 px-4">
        {books.map((book: MainBook, i: number) => (
          <Link key={i} href={`/books/${book.slug}`}>
          <div className="flex flex-col items-center bg-[#1A202C] rounded-xl overflow-auto border border-[#1A202C]">
            <Image
              src={book.imageUrl}
              alt={book.name}
              width={140}
              height={140}
            />
            {/* <div className="text-center text-white pb-1">
              {book.name}
            </div> */}
          </div>
        </Link>
        ))}
      </div>
    </>
  )
}
export default Books
