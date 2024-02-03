'use server'
import prisma from '@/app/services/db'

export default async function countClick(
  bannerName: string
) {
  try {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const day = currentDate.getDay()

    const dateToTable = new Date(year, month - 1, day);
    
    const existRecord = await prisma.banners.findFirst({where: {date_click: dateToTable,}})
    
    if (existRecord && existRecord.count) {
      await prisma.banners.update({where: {id: existRecord.id}, data: {count: existRecord.count + 1}})
    } else {
      await prisma.banners.create({data: {
        name: bannerName,
        count: 1,
        date_click: dateToTable,
      }})
      console.log(`Запись создана для баннера с названием ${bannerName}`)
    }
  } catch(error) {
    console.log(error)
    throw new Error("Проблемы с баннером")
  }
    
}