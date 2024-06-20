import { Book } from '@/app/shared/_model/interface'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  allSiries: Book[]
}

const AllSiries = ({ allSiries }: Props) => {
  return (
    <div>
      <h2 className="font-semibold text-2xl ml-4">Книги из серии</h2>
      <div className="m-auto w-2/3">
        <Carousel className="relative">
          <CarouselContent>
            {allSiries.map((item, i: number) => (
              <CarouselItem key={i} className="basis-1/2">
                <Link href={`/books/${item.slug}`}>
                  <Image
                    src={item.imageUrl}
                    width={140}
                    height={140}
                    alt={item.name}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12 bg-[#1A202C] text-white" />
          <CarouselNext className="absolute -right-12 bg-[#1A202C] text-white" />
        </Carousel>
      </div>
    </div>
  )
}

export default AllSiries
