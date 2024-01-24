'use server'
import prisma from "@/app/services/db"

export async function getAuthors() {
  const res = await prisma.authors.findMany()
  return res
}

export async function getChtecs() {
  const res = await prisma.chtecs.findMany()
  return res
}