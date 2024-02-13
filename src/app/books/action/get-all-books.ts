'use server'
import prisma from '@/app/services/db'

export default async function getAllBooks() {
  try {
    const res = await prisma.books.findMany()
    return res
  } catch (error) {
    console.log('Не удалось получить все книги', error)
    return JSON.stringify(error)
  }
}
