'use server'
import prisma from '@/app/services/db'
import { z } from 'zod'

const createGenreScheme = z.object({
  name: z.string().min(2),
})

export default async function createGenre(data: any) {
  try {
    const name = data.get('name')

    const genreData = {
      name: name,
    }
    const validGenre = createGenreScheme.parse(genreData)

    const existsGenre = await prisma.genres.findFirst({where: {name: validGenre.name}})

    if (existsGenre) {
      throw new Error('Такой жанр уже есть')
    }

    const genre = await prisma.genres.create({
      data: validGenre,
    })
    return genre
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.errors[0].message)
      return error.errors[0].message
    }
    console.log('Не удалось создать жанр', error.message)
    return JSON.stringify(error.message)
  }
}
