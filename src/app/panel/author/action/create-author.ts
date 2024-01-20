'use server'
import prisma from "@/app/services/db"

export default async function createAuthor (data: FormData) {
  try {
    const name = await data.get('name')
    console.log(name)
    return (name)
  } catch(error: any) {
    console.log("Не удалось создать автора", error.response.data)
    return(error.response.data)
  }
  
}