'use server'
import prisma from '@/app/services/db'
import { z } from 'zod'

const createChtecSchem = z.object({
  name: z.string().min(2),
})

export default async function createChtec(data: any) {
  try {
    const name = data.get('name')

    const chtecData = {
      name: name,
    }
    const validChtec = createChtecSchem.parse(chtecData)

    const existsChtec = await prisma.chtecs.findFirst({where: {name: validChtec.name}})

    if (existsChtec) {
      throw new Error('Такой чтец уже есть')
    }

    const chtec = await prisma.chtecs.create({
      data: validChtec,
    })
    return chtec
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.errors[0].message)
      return error.errors[0].message
    }
    console.log('Не удалось создать чтеца', error.message)
    return JSON.stringify(error.message)
  }
}
