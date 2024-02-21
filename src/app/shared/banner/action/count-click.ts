'use server'
import prisma from '@/app/services/db'

export async function countClick(bannerName: string) {
  try {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const day = currentDate.getDate()

    const dateToTable = new Date(year, month, day)

    const existRecord = await prisma.banners.findFirst({
      where: { date_click: dateToTable },
    })

    if (existRecord && existRecord.count) {
      await prisma.banners.update({
        where: { id: existRecord.id },
        data: { count: existRecord.count + 1 },
      })
    } else {
      await prisma.banners.create({
        data: {
          name: bannerName,
          count: 1,
          date_click: dateToTable,
        },
      })
      console.log(`Запись создана для баннера с названием ${bannerName}`)
    }
  } catch (error) {
    console.log(error)
    throw new Error('Проблемы с баннером')
  }
}

export async function countClickToMain() {
  try {
    const bannerMain = await prisma.banners.findMany({where: {
      name: 'main',
    }})
    const countToDay = bannerMain[bannerMain.length - 1]
    const totalClickMain = bannerMain.reduce((sum, el) => {
      // Проверяем, что значение свойства count не равно null
      if (el.count !== null) {
        // Добавляем значение count к аккумулятору sum
        sum += el.count;
      }
      return sum;
    }, 0);
    const res = {
      day: countToDay.count,
      total: totalClickMain
    }
    return res
  } catch(error) {
    console.log("Не удалось получить количество кликов по главному баннеру", error)
  }
}
