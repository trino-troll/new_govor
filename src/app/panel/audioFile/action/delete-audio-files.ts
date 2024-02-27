'use server'
import prisma from '@/app/services/db' 
export async function deleteAudioFiles(id: number) {
  try {
    const res = await prisma.audioFiles.delete({where: {id: id}})
    return (res)
  } catch (error: any) {
    console.log('Не удалось удалить аудиозапись', error.message)
  }
}