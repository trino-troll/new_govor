'use server'
import prisma from "@/app/services/db"

export async function findBook(findText: string) {
  try {
    const response = await prisma.books.findMany({where: {
      name: {
        contains: findText
      }
    }}) 
    return response
  } catch(error) {
    console.log(error)
  }
}