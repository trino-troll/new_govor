'use client'
import Image from 'next/image'
import arrowRight from '../../../public/arrow_right.svg'
import arrowLeft from '../../../public/arrow_left.svg'
import play from '../../../public/play.svg'
import pause from '../../../public/pause.svg'
import prew15 from '../../../public/prew15.svg'
import back15 from '../../../public/back15.svg'
import list from '../../../public/list.svg'
import { Dispatch, LegacyRef, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { Song, CurrentSong, AudioFiles } from '../books/[slug]/page'

type Props = {
  songs: AudioFiles[],
  setSongs: Dispatch<SetStateAction<AudioFiles[]>>,
  isplaying: boolean,
  setisplaing: (isplaying: boolean) => void,
  audioElem: any,
  currentSong: CurrentSong,
  setCurrentSong: (song: CurrentSong) => void,
}

const Player = ({songs, setSongs, isplaying, setisplaing, audioElem, currentSong, setCurrentSong}: Props) => {
  const clickRef = useRef<HTMLDivElement>();
  const [isEmptyProgress, setIsEmptyProgress] = useState<boolean>(false)
  const [isShowList, setIsShowList] = useState<boolean>(false)
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const PlayPause = (play: boolean)=> {
    setisplaing(play)
  }

  const checkWidth = (e: any) => {
    let width = clickRef.current?.clientWidth;
    const offset = e.nativeEvent.offsetX;

    if (width && currentSong.length) {
      const divprogress = offset / width * 100
      audioElem.current.currentTime = divprogress / 100 * currentSong.length
    }
  }

  const skipBack = () => {
    const index = songs.findIndex(x => x.name == currentSong.name)
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1])
    } else {
      setCurrentSong(songs[index - 1])
    }
    audioElem.current.currentTime = 0;
    setIsEmptyProgress(true)
    PlayPause(true)
  }

  const skipToNext = () => {
    const index = songs.findIndex(x => x.name == currentSong.name)
    if (index == songs.length - 1) {
      setCurrentSong(songs[0])
    } else {
      setCurrentSong(songs[index + 1])
    }
    audioElem.current.currentTime = 0;
    setIsEmptyProgress(true)
    PlayPause(true)
  }

  const normalTime = (time: number) => {
    let seconds: number | string = time % 60
    let minutes: number | string = Math.floor(time / 60)

    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    
    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    return `${minutes}:${seconds}`
  }

  const rewind = () => {
    audioElem.current.currentTime = audioElem.current.currentTime - 15
  }
  
  const rewind_prew = () => {
    audioElem.current.currentTime = audioElem.current.currentTime + 15
  }

  useEffect(() => {
    setIsEmptyProgress(false)
  }, [isEmptyProgress])


  useEffect(() => {
    console.log(isScrolling)
  }, [isScrolling])

  useEffect(() => {
    localStorage.setItem('audioName', currentSong.name)
  }, [currentSong])

  return (
    <div className='bg-yellow-600 m-4 border-2 border-black rounded-3xl relative'>
      <Image src={list} alt='Список глав' className='absolute top-0 right-2 w-10 h-10 cursor-pointer' title='Список глав' onClick={() => setIsShowList(!isShowList)}/>
      <div className='text-center font-semibold'>
        <p>{currentSong.name}</p>
      </div>
      <div className='flex justify-between pl-4 pr-14 text-white font-semibold '>
        {audioElem.current ? (<p>{normalTime(Math.round(audioElem.current.currentTime)) }</p>) : (<p>00:00</p>)}
        {/* <p>{currentSong.time}</p> */}
      </div>
      <div className='px-4 mb-2'>
        <div className='w-full border border-black rounded-md cursor-pointer' 
             onClick={checkWidth}
             ref={clickRef as React.RefObject<HTMLDivElement>}
        >
          <div className='bg-green-700 h-3 rounded-lg' style={{width: `${isEmptyProgress ? '0' : currentSong.progress}%`}}></div>
        </div>
      </div>

      <div className='flex justify-between mx-2 pl-2 mb-1'>
        <Image src={arrowLeft} alt='Назад'
          onClick={skipBack}
          className='cursor-pointer'/>
        <Image src={back15} alt='Перемотка на -15 секунд' onClick={rewind} className='cursor-pointer'/>
        {isplaying ? (
            <Image src={pause} alt='Пауза' className="cursor-pointer" onClick={() => PlayPause(false)}/>
          ) : (
            <Image src={play} alt='Воспроизвести' title='Воспроизвести' className="cursor-pointer" onClick={() => PlayPause(true)}/>
          )
        }
        <Image src={prew15} alt='Перемотка на +15 секунд' onClick={rewind_prew} className='cursor-pointer'/>
        <Image src={arrowRight} alt='Вперёд' 
          onClick={skipToNext}
          className='cursor-pointer'/>
      </div>

      {isShowList && 
        <div 
          className='bg-yellow-500 rounded-lg mx-4 mb-6 p-2 divide-y-2 divide-black h-52 overflow-y-auto'
        >
          {songs.map((song, i:number) => (
            <div className='flex justify-between cursor-pointer py-2 font-semibold' key={i}>
              <p>{song.name}</p>
            </div>
          ))}
        </div>
      }
          <div className='mb-4'></div>
      {/* Сделать переключение по клику */}
    </div>
  )
}
export default Player;