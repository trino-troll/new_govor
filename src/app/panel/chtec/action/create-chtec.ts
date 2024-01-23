'use server'
import prisma from "@/app/services/db"
import { z } from "zod"

const createChtecSchem = z.object({
  name: z.string().min(2)
})

export default async function createChtec (data: any) {
  try {
    const name = data.get('name')

    const chtecData = {
      name: name
    } 
    const validChtec = createChtecSchem.parse(chtecData)

    const chtec = await prisma.chtecs.create({
      data: validChtec
    })
    return (chtec)
  } catch(error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.errors[0].message)
      return (error.errors[0].message)
    }
    console.log("Не удалось создать чтеца")
    return(JSON.stringify(error))
  } 
}