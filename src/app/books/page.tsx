import Link from 'next/link'
import getNameImgBooks from './action/get-name-img-books'
import Image from 'next/image'


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
    </>
  )
}
export default Books
