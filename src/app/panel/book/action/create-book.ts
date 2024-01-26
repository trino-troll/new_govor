'use server'
import { z } from 'zod'
import { writeFile } from 'fs/promises'
import { join } from 'path' 
import prisma from '@/app/services/db'
import { transliterate } from 'transliteration'

const CreateBookScheme = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  authorID: z.number(),
  chtecId: z.number(),
})

export default async function CreateBook(data: any) {
  try {
    const rusName = data.get('name')
    const latName = transliterate(rusName)
    const slug = latName.split(' ').join('-')


    // сохраниние картинки
    const file: File | null = data.get('file') as unknown as File 

    if (!file) {
      throw new Error('Нет изображения')
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = join('public', 'audiobooks', 'images', file.name)
    await writeFile(path, buffer)
    console.log(`фаил по адресу ${path} загружен`)
    // сохраниние картинки
  
    const authorStr = data.get('author')
    const chtecStr = data.get('chtec')

    if (authorStr && chtecStr) {
      const dataBook = {
        name: data.get('name'),
        slug: slug,
        description: data.get('description'),
        imageUrl: path,
        authorID: +authorStr,
        chtecId: +chtecStr,
      }

      const validBook = CreateBookScheme.parse(dataBook)
      
      const book = await prisma.books.create({
        data: validBook
      })
      return book
    }
  } catch(error) {
    console.log("Не удалось сделать запись в таблицу books.", error)
  }
  
}