'use server'
import prisma from '@/app/services/db'

export default async function getOneBook(slug: string) {
  try {
    const book = await prisma.books.findFirst({where: {slug: slug}})
    return book
  } catch(error) {
    console.log('Не удалось получить книгу', error)
    return (JSON.stringify(error))
  }
} 