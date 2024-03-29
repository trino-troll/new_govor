'use client'
import Player from '@/app/shared/player'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getOneBook, getSeriesBooks } from './action/get-one-book'
import getAudioForBook from './action/get-auido-for-book'
import { toast } from 'react-toastify'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'

type Props = {
  params: {
    slug: string
  }
}

export interface Song {
  title: string
  url: string
  time: string
}
export interface CurrentSong {
  id: number
  name: string
  bookId: number
  audioUrl: string
  progress?: number
  length?: number
}

interface Book {
  id: number
  name: string
  slug: string
  description: string
  imageUrl: string
  chtecId: number
  authorID: number
  seriesId: number | null
  genreId: number | null
}
export interface AudioFiles {
  id: number
  name: string
  bookId: number
  audioUrl: string
}

const BookPage = ({ params: { slug } }: Props) => {
  // Инициализация времени из локалСтораж
  const initialTime =
    typeof window !== 'undefined' ? localStorage.getItem('audioTime') : null
  const loadedTime = initialTime === null ? 0 : Number(initialTime)
  const [time, setTime] = useState<number>(loadedTime)
  const initialName =
    typeof window !== 'undefined' ? localStorage.getItem('audioName') : null
  const loadedName = initialName === null ? null : initialName
  // Конец

  const [songs, setSongs] = useState<AudioFiles[]>([])
  const [isplaying, setisplaing] = useState(true)
  const [currentSong, setCurrentSong] = useState<CurrentSong>()
  const audioElem = useRef<HTMLAudioElement | null>(null)
  const [book, setBook] = useState<Book | null>(null)
  const [allSiries, setAllSeries] = useState<Book[]>([])

  //Получение книги
  const getBook = async () => {
    try {
      const fetchBook = await getOneBook(slug)
      if (fetchBook && typeof fetchBook !== 'string') {
        setBook(fetchBook)
      } else {
        toast.error('Ошибка получения книги', { autoClose: 3000 })
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Получение книг серии
  const getSiriesAll = async (series: number) => {
    try {
      const allBooksSiries = await getSeriesBooks(series)
      if (allBooksSiries && typeof allBooksSiries !== 'string') {
        setAllSeries(allBooksSiries)
      } else {
        toast.error('Ошибка получения книги', { autoClose: 3000 })
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Получение аудио для книги
  const getAudioForBookOnClient = async (id: number, name: string) => {
    try {
      const res = await getAudioForBook(id)
      if (Array.isArray(res)) {
        const sortedRes = [...res].sort((a, b) => a.name.localeCompare(b.name))
        setSongs(sortedRes)
      }
    } catch (error) {
      console.log(`Не удалось получи аудиок к книге ${name}`)
    }
  }
  //Получение книги
  useEffect(() => {
    getBook()
  }, [])
  //Получение аудио
  useEffect(() => {
    if (book) {
      getAudioForBookOnClient(book.id, book.name)
    }
    if (book?.seriesId) {
      getSiriesAll(book.seriesId)
    }
  }, [book])

  //плаер
  useEffect(() => {
    if (isplaying) {
      console.log(audioElem.current)
      audioElem.current?.play()
    } else {
      audioElem.current?.pause()
    }
  }, [isplaying])

  const osPlaying = () => {
    const duration: number | undefined = audioElem.current?.duration
    const ct: number | undefined = audioElem.current?.currentTime

    if (duration && ct && currentSong) {
      setCurrentSong({
        ...currentSong,
        progress: (ct * 100) / duration,
        length: duration,
      })
    }
    handleTimeUpdate()
  }

  const handleTimeUpdate = () => {
    if (audioElem.current) {
      setTime(audioElem.current.currentTime) // Обновление состояния текущим временем аудио
    }
  }

  useEffect(() => {
    localStorage.setItem('audioTime', JSON.stringify(time))
  }, [time])

  useEffect(() => {
    if (songs.length > 0) {
      setCurrentSong({ ...songs[0], progress: 0 })

      if (localStorage.getItem('bookName') === book?.name) {
        const initialName = localStorage.getItem('audioName')
        if (initialName !== null && initialName !== 'undefined') {
          const findSong = songs.find((song) => song.name === initialName)
          if (findSong) {
            setCurrentSong({ ...findSong, progress: 0 })
          }
        }

        const time = Number(localStorage.getItem('audioTime'))
        if (time > 0 && audioElem.current) {
          audioElem.current.currentTime = time
        }
      }
    }
  }, [songs, book])

  if (!book)
    return (
      <div className="flex w-full h-screen items-center justify-center text-xl font-semibold">
        Загрузка...
      </div>
    )

  return (
    <>
      <h2 className="text-center text-[24px] font-semibold">{book.name}</h2>
      <div>
        <div className=" w-1/2 p-4 float-left">
          <Image
            src={book.imageUrl}
            width={210}
            height={210}
            alt={book.name}
          />
        </div>
        <p className="px-4">{book.description}</p>
      </div>
      <audio
        src={currentSong?.audioUrl}
        ref={audioElem}
        onTimeUpdate={osPlaying}
        autoPlay={true}
      />
      {songs && currentSong && (
        <Player
          songs={songs}
          setSongs={setSongs}
          isplaying={isplaying}
          setisplaing={setisplaing}
          audioElem={audioElem}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          bookName={book.name}
        />
      )}

      {allSiries.length > 1 && (
        <div>
          <h2 className='font-semibold text-2xl ml-4'>Книги из серии</h2>
          <div className='m-auto w-2/3'>
            <Carousel className='relative'>
              <CarouselContent >
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
              <CarouselPrevious className='absolute -left-12 bg-[#1A202C] text-white'/>
              <CarouselNext className='absolute -right-12 bg-[#1A202C] text-white'/>
            </Carousel>
          </div>
        </div>
      )}
      
    </>
  )
}
export default BookPage
