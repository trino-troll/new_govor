'use server'
import prisma from '@/app/services/db'

export default async function getNameImgBooks(findText: string) {
  try {
    if (findText) {
      const res = await prisma.books.findMany({where: {
        name: {
          contains: findText
        }
      }}) 
      return res
    } else {
      const res = await prisma.books.findMany({
        select: {
          name: true,
          slug: true,
          imageUrl: true,
        },
      })
      return res
    }
  } catch (error) {
    console.log('Не удалось полоучить названия книг', error)
  }
}
