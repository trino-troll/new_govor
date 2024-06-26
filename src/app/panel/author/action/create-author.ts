'use server'
import prisma from '@/app/services/db'
import { z } from 'zod'

const createAuthorSchem = z.object({
  name: z.string().min(2),
})

export default async function createAuthor(data: any) {
  try {
    const name = data.get('name')

    const authorData = {
      name: name,
    }
    const validAutor = createAuthorSchem.parse(authorData)

    const existsAutor = await prisma.authors.findFirst({where: {name: validAutor.name}})
    console.log(existsAutor)
    if (existsAutor) {
      throw new Error("Такой автор уже есть")
    }

    const author = await prisma.authors.create({
      data: validAutor,
    })
    return author
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.errors[0].message)
      return error.errors[0].message
    }
    console.log('Не удалось создать автора', error.message)
    return JSON.stringify(error.message)
  }
}
