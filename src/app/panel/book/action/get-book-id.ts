'use server'
import prisma from '@/app/services/db'

export default async function getBookId(id: number) {
  try {
    const res = await prisma.books.findFirst({where: {id: id}})
    return(res)
  } catch(error) {
    console.log(`Не удалось получить книгу по id ${id}`)
  }
}