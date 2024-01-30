'use server'
import { z } from 'zod'
import prisma from "@/app/services/db"

const currentUserScheme = z.object({
  name: z.string().min(4),
  email: z.string().email(), 
})

export default async function authUserVerify(data: any) {
  const name = data.get('name_1')
  const email = data.get('name_4')

  const dataUser = {
    name: name,
    email: email,
  }

  try {
    const validUserData = currentUserScheme.parse(dataUser)
    const user = await prisma.users.findFirst({where: {name: name, email: email}})

    if (user) {
      try {
        const role = await prisma.roles.findFirst({where: {id: user?.roleId}})

        if (role) {
          return role?.role
        } else {
          console.log('Не удалось установить роль для пользователя')
        }
      } catch(error) {
        console.log('Не удалось установить роль', error);
      }
    } else {
      console.log('Нет пользователя')
    }
  } catch(error) {
    console.log('Данные не прошли валидацию');
  }
}