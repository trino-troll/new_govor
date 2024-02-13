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

    const genre = await prisma.genres.create({
      data: validGenre,
    })
    return genre
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.errors[0].message)
      return error.errors[0].message
    }
    console.log('Не удалось создать автора')
    return JSON.stringify(error)
  }
}
