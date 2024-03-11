import Link from "next/link";
import Image from "next/image";

type Props = {
  slug: string,
  imageUrl: string,
  name: string,
  keyI: number
}
const BookCard = ({slug,imageUrl, name, keyI}: Props) => {

  return (
    <Link key={keyI} href={`/books/${slug}`}>
      <div className="flex flex-col items-center bg-[#1A202C] rounded-xl overflow-auto border border-[#1A202C]">
        <Image
          src={imageUrl}
          alt={name}
          width={140}
          height={140}
        />
        {/* <div className="text-center text-white pb-1">
          {book.name}
        </div> */}
      </div>
    </Link>
  )
}
export default BookCard;