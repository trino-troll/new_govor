'use server'
import { z } from 'zod'
import { mkdir, writeFile, rename } from 'fs/promises'
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
  seriesId: z.number().nullable(),
  genreId: z.number().nullable(),
})

const UpdateBookScheme = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  authorID: z.number(),
  chtecId: z.number(),
  seriesId: z.number().nullable(),
  genreId: z.number().nullable(),
})

export async function CreateBook(data: any) {
  try {
    const rusName = data.get('name')
    const latName = transliterate(rusName)
    const slug = latName.replace('.', '').replace(',', '').split(' ').join('-')

    // сохраниние картинки
    const file: File | null = data.get('file') as unknown as File

    let path = '/public/deafault-book.svg'

    if (!file) {
      throw new Error('Нет изображения')
    } else if (file.name && file.size > 0) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const pathToDir = join('public', 'audiobooks', `${slug}`)
      await mkdir(pathToDir, { recursive: true })

      path = join('public', 'audiobooks', `${slug}`, file.name)
      await writeFile(path, buffer)
      console.log(`фаил по адресу ${path} загружен`)
    }
    // сохраниние картинки

    const authorStr = data.get('author')
    const chtecStr = data.get('chtec')
    const seriesStr = +data.get('series')
    const genreStr = +data.get('genre')

    if (authorStr && chtecStr) {
      const dataBook = {
        name: data.get('name'),
        slug: slug,
        description: data.get('description'),
        imageUrl: path.replace('public', ''),
        authorID: +authorStr,
        chtecId: +chtecStr,
        seriesId: seriesStr !== 0 ? seriesStr : null,
        genreId: genreStr !== 0 ? genreStr : null,
      }

      const validBook = CreateBookScheme.parse(dataBook)

      const existsBook = await prisma.books.findFirst({where: {name: validBook.name}})

      if (existsBook) {
        throw new Error('Такая книга уже есть')
      }

      const book = await prisma.books.create({
        data: validBook,
      })
      return book
    }
  } catch (error: any) {
    console.log('Не удалось сделать запись в таблицу books.', error. message)
    return (error.message)
  }
}


export async function  updateBook(data: any, id: string) {
  const book = await prisma.books.findFirst({where: { id: +id}})

  const rusName = data.get('name')
  const latName = transliterate(rusName)
  const slug = latName.replace('.', '').replace(',', '').split(' ').join('-')

  let newPath = ''
  if (book?.name !== rusName && book?.imageUrl) {
    let tmp = book?.imageUrl.split('/')
    tmp[tmp.length - 1] = ''
    const oldPath = tmp.join('/')
    newPath = join('public', 'audiobooks', `${slug}`)
      await rename('public' + oldPath, newPath)
  }

  if (newPath) {
    console.log(newPath)
    const nameAudioNew = await prisma.audioFiles.findMany({where: {bookId: book?.id}})
    for (const item of nameAudioNew) {
      await prisma.audioFiles.update({
          where: {
              id: item.id
          },
          data: {
              audioUrl: `${newPath.replace('public', '')}/${item.name}`
          }
      })
  }
  }

  let newImageUrl = ''
  if (newPath && book) {
    const tmpImgUrl = book.imageUrl
    let arrTmpImgUrl = tmpImgUrl.split('/')
    arrTmpImgUrl[arrTmpImgUrl.length -2] = slug
    newImageUrl = arrTmpImgUrl.join('/')
  }

  // сохраниние картинки
  const file: File | null = data.get('file') as unknown as File

  let path = ''

  if (!file) {
    throw new Error('Нет изображения')
  } else if (file.name && file.size > 0) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    path = join('public', 'audiobooks', `${slug}`, file.name)

    await writeFile(path, buffer)
    console.log(`фаил по адресу ${path} загружен`)
  }
  // сохраниние картинки

  const dataBook = {
    name: data.get('name'),
    slug: slug,
    description: data.get('description'),
    imageUrl: path.replace('public', '') || newImageUrl.replace('public', '') || book?.imageUrl,
    authorID: +data.get('author'),
    chtecId: +data.get('chtec'),
    seriesId: +data.get('series'),
    genreId: +data.get('genre'),
  }

  const validBook = CreateBookScheme.parse(dataBook)

  const updatedBook = await prisma.books.update({
    where: {id: +id},
    data: validBook,
  })
  return updatedBook
} 