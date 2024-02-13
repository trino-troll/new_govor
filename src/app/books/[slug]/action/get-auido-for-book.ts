'use server'
import prisma from '@/app/services/db'

export default async function getAudioForBook(book: number) {
  try {
    const res = await prisma.audioFiles.findMany({ where: { bookId: book } })
    return res
  } catch (error) {
    console.log('Не удалось получить данные из audioFiles')
    return JSON.stringify(error)
  }
}
