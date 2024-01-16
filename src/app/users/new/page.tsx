
import { roles } from '@prisma/client'
import { db } from "@/app/services/db"
import { z } from "zod"

const createUserScheme = z.object({
  name: z.string(),
  email: z.string().email(),
  // role: z.enum([db.roles.role]),
})



const NewUser = () => {
  async function newUser(data: FormData) {
    'use server';

    const createUser = createUserScheme.parse({
      name: data.get('name'),
      email: data.get('email'),
      role: data.get('role'),
    })

    // db.users.create({
    //   data: createUser,
    // });
  }
  
  return(
    <div className="p-4 mx-2 border border-[#1A202C] rounded-lg">
      <h2 className="text-center text-2xl text-[#1A202C] font-semibold">Создание нового пользователя</h2>
      <form action={newUser}>
        <div className="flex flex-col mt-2">
          <label htmlFor="nema">Имя</label>
          <input type="text" name="name" className="px-2 py-1 border-2 border-[#1A202C] rounded-md"/>
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="email">Почта</label>
          <input type="email" name="email" className="px-2 py-1 border-2 border-[#1A202C] rounded-md"/>
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="role">Роль</label>
          <input type='text' name="role" id="" className="px-2 py-1 border-2 border-[#1A202C] rounded-md"/>
        </div>
        <button type="submit" className="mt-2 px-4 py-2 font-semibold text-white bg-[#1A202C] rounded-xl">Создать пользователя</button>
      </form>
    </div>
  )
}
export default NewUser;