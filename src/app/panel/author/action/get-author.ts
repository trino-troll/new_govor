import prisma from '@/app/services/db'

export default async function getAuthor(id: number) {
  const res = await prisma.authors.findFirst({where: {id: id}})
  return res
}