'use server'
import prisma from "@/app/services/db"
import { z } from "zod"
import { join } from "path";
import { writeFile } from "fs/promises";
import AudioFile from "../page";

const createAudioFilesScheme = z.object({
  name: z.string().min(2),
  bookId: z.number(),
  audioUrl: z.string()
})

export default async function createAudioFiles (data: any) {
  const arrayAudioFile = data.getAll('audioFiles')
  const idBook = data.get('book')

  if ( idBook !== null ) {
    const book = await prisma.books.findFirst({
      where: {
        id: +idBook
      }
    })
    const dir = book?.slug //для папки

    if (arrayAudioFile && arrayAudioFile.length > 0 && dir) { //если есть массив и длинна больше 0
      let counter: number = 0

      await Promise.all(
        arrayAudioFile.map(async (file: File) => {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)
    
          const path = join('public', 'audiobooks', dir, file.name.replace(' ',''))
          await writeFile(path, buffer)
          console.log(`фаил по адресу ${path} загружен`) // работает
  
          try {
            const audioFileData = {
              name: file.name.replace(' ', ''),
              bookId: +idBook,
              audioUrl: path.replace('public', ''),
            } 
            const validAudioFile = createAudioFilesScheme.parse(audioFileData)
            const newAudioFile = await prisma.audioFiles.create({
              data: validAudioFile
            })
            if (newAudioFile) counter += 1 
          } catch(error: any) {
            if (error instanceof z.ZodError) {
              console.log(error.errors[0].message)
              return (error.errors[0].message)
            }
            console.log("Не удалось создать аудиофаил")
            return(JSON.stringify(error))
          } 
        })
      )
      if (counter === arrayAudioFile.length) {
        console.log(`Добавлено ${counter} из ${arrayAudioFile.length}`)
        return (`Успех. Добавлено ${counter} из ${arrayAudioFile.length}`)
      } else {
        return (`Ошибка. Не все файлы добавлены. Проверь таблицу и файлы в палке. ${counter} / ${arrayAudioFile.length}`)
      }
    }
  } else {
    throw new Error('Некорректный id книги')
  }

  if (!arrayAudioFile) {
    throw new Error('Нет изображения')
  } 
}