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
      {books.map((book, i: number) => (
        <Link key={i} href={`/books/${book.slug}`}>
          <div className="flex flex-col bg-[#1A202C] rounded-xl overflow-auto h-full">
            <Image
              src={book.imageUrl.replace('public', '')}
              alt="Изо"
              width={210}
              height={210}
            />
            <div className="text-center font-semibold text-white pb-1">
              {book.name}
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}
export default Books
