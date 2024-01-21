'use server'
import prisma from "@/app/services/db"

export default async function createAuthor (data: any) {
  try {
    const name = data.get('name')
    console.log(name)

    const author = await prisma.authors.create({
      data: {
        name: name
      }
    }
    )
    return (author)
  } catch(error: any) {
    console.log("Не удалось создать автора")
    return(JSON.stringify(error))
  } 
}