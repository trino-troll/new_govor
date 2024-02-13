'use server'
import prisma from '@/app/services/db'

export async function getAuthors() {
  const res = await prisma.authors.findMany()
  return res
}

export async function getChtecs() {
  const res = await prisma.chtecs.findMany()
  return res
}

export async function getSeries() {
  const res = await prisma.series.findMany()
  return res
}

export async function getGenres() {
  const res = await prisma.genres.findMany()
  return res
}

export async function getBooks() {
  const res = await prisma.books.findMany()
  return res
}
