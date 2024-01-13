'use client'
import Player from "@/app/shared/player";
import {songsdata} from '@/app/shared/audio'
import { useEffect, useRef, useState } from "react";
import image from '../../../../public/audiobooks/Атаманов_М_Искажающие_реальность_01/ir1.jpg'
import Image from "next/image";

type Props = {
  params: {
    slug: string,
  }
}

export interface Song {
  title: string,
  url: string,
  time: string,
}
export interface CurrentSong {
  title: string,
  url: string,
  time: string,
  progress?: number,
  length?: number,
}

const BookPage = ({params: { slug }}: Props) => {
  const [songs, setSongs] = useState<Song[]>(songsdata);
  const [isplaying, setisplaing] = useState(false);
  const [currentSong, setCurrentSong] = useState<CurrentSong>({...songsdata[0], progress: 0});
  const audioElem = useRef<HTMLAudioElement | null>(null);
  const [showDesc, setShowDesc] = useState<boolean>(false)

  useEffect(() => {
    if (isplaying ) {
      audioElem.current?.play()
    } else {
      audioElem.current?.pause()
    }
  },[isplaying])

  const osPlaying = () => {
    const duration: number | undefined = audioElem.current?.duration;
    const ct: number | undefined = audioElem.current?.currentTime;

    if (duration && ct) {
      setCurrentSong({...currentSong, progress: ct * 100 / duration, length: duration})
    }
    
  }

  if (songs.length === 0) return (<div>Загрузка...</div>) 

  return(
    <>
      <h2 className="text-center text-[24px] font-semibold">Искажающие реальность.</h2>
      <div className=""> 
        <div className="w-full p-4">
          <Image src={image} alt="Изображение"/>
        </div>        
      </div>
      <audio src={currentSong?.url} ref={audioElem} onTimeUpdate={osPlaying} autoPlay/>
      <Player 
        songs={songs} 
        setSongs={setSongs} 
        isplaying={isplaying} 
        setisplaing={setisplaing} 
        audioElem={audioElem}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
      <div className="px-4">
        <button className="w-full py-2 rounded-xl bg-yellow-600 text-white font-bold"
        onClick={() => setShowDesc(!showDesc)}
      >{showDesc ? 'Скрыть описание' : 'Показать описание' }</button>
      </div>

      {showDesc && (
        <div className="w-full p-4">
        «Искажающие реальность» – первая книга из одноимённого цикла. Действие происходит в будущем. Во всех средствах массовой информации навязчиво повторяется некое послание от инопланетной расы. В нём говорится, что наша цивилизация созрела для вступления в игру, искажающую реальность.
        Но большинство людей воспринимает это известие как шутку или рекламу. О том, что на самом деле всё серьёзно, узнаёт главный герой книги, студент и победитель многочисленных турниров онлайн-игр. Его и многих других ребят, снискавших лавры на этом поприще, государство привлекает в качестве рекрутов для вступления в игру, предложенную пришельцами. От результатов человеческой фракции зависит очень многое для нашей планеты. Комар (именно такой ник выбирает наш герой) всегда избегал стандартных путей и потому часто оказывался победителем. Особый класс игры и необычная линия поведения рекрута сначала раздражают руководство фракции Human. Но чем дальше, тем отчётливей оно понимает, что с помощью Комара наша планета получила шанс покинуть ряды аутсайдеров игры и сделать качественный технологический рывок. Удастся ли эту возможность реализовать? Ответит аудиокнига.    
        </div>
      )}
      
    </>
  )
}
export default BookPage;