'use server'
import prisma from '@/app/services/db'

export async function getOneBook(slug: string) {
  try {
    const book = await prisma.books.findFirst({ where: { slug: slug } })
    return book
  } catch (error) {
    console.log('Не удалось получить книгу', error)
    return JSON.stringify(error)
  }
}

export async function getSeriesBooks(siriesId: number) {
  try {
    const books = await prisma.books.findMany({ where: { seriesId: siriesId} })
    return books
  } catch (error) {
    console.log('Не удалось получить книгу', error)
    return JSON.stringify(error)
  }
}
