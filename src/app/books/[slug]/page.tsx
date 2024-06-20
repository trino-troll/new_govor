'use client'
import { AudioFiles, Book, CurrentSong } from '@/app/shared/_model/interface'
import Player from '@/app/shared/player'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import getAudioForBook from './action/get-auido-for-book'
import { getOneBook, getSeriesBooks } from './action/get-one-book'
import AllSiries from './components/all-siries'

type Props = {
  params: {
    slug: string
  }
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
  const [loadedFile, setLoadedFile] = useState<number>(0)

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

  useEffect(() => {
    if (currentSong && audioElem.current) {
      if (audioElem.current.buffered.length > 0) {
        const bufferedEnd = audioElem.current.buffered.end(
          audioElem.current.buffered.length - 1,
        )
        const duration = audioElem.current.duration
        const loadTime = Math.round((bufferedEnd / duration) * 100)
        if (loadTime !== loadedFile) {
          setLoadedFile(loadTime)
        }
      }
    }
  }, [currentSong, loadedFile])

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
          <Image src={book.imageUrl} width={210} height={210} alt={book.name} />
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
          loadedFile={loadedFile}
        />
      )}

      {allSiries.length > 1 && <AllSiries allSiries={allSiries} />}
    </>
  )
}
export default BookPage
