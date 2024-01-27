'use server'
import prisma from "@/app/services/db"
import { z } from "zod"

const createSeriesSchem = z.object({
  name: z.string().min(2)
})

export default async function createSeries (data: any) {
  try {
    const name = data.get('name')

    const seriesData = {
      name: name
    } 
    const validSeries = createSeriesSchem.parse(seriesData)

    const series = await prisma.series.create({
      data: validSeries
    })
    return (series)
  } catch(error: any) {
    if (error instanceof z.ZodError) {
      console.log(error.errors[0].message)
      return (error.errors[0].message)
    }
    console.log("Не удалось создать серию")
    return(JSON.stringify(error))
  } 
}