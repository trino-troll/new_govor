'use server'
import prisma from "@/app/services/db"

export default async function getNameImgBooks() {
  try {
    const res = await prisma.books.findMany({
      select: {
        name: true,
        slug: true,
        imageUrl: true,
      }
    })
    return res
  } catch(error) {
    console.log('Не удалось полоучить названия книг', error)
  } 
}