import Link from 'next/link'
import getNameImgBooks from './action/get-name-img-books'
import Image from 'next/image'
import BookCard from '../shared/book-card/page'

interface MainBook {
  name: string
  slug: string | null
  imageUrl: string
}

const Books = async () => {
  const books: MainBook[] | undefined = await getNameImgBooks()

  if (books === undefined) return <div>Что-то пошло не так...</div>

  return (
    <>
      {books.map((book: MainBook, i: number) => (
        book.slug && <BookCard slug={book.slug} imageUrl={book.imageUrl} name={book.name} keyI={i} />
      ))}
    </>
  )
}
export default Books
