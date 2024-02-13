import prisma from '@/app/services/db'
import { z } from 'zod'

const NewUser = async () => {
  const dataRole = await prisma.roles.findMany()

  async function newUser(data: FormData) {
    'use server'

    console.log(data)

    const name = data.get('name') ?? ''
    const email = data.get('email') ?? ''
    const role = data.get('role') ?? '4'

    const user = await prisma.users.create({
      data: {
        name: name.toString(),
        email: email.toString(),
        roleId: +role,
      },
    })
    console.log('Новый ', user)
  }

  return (
    <div className="p-4 mx-2 border border-[#1A202C] rounded-lg">
      <h2 className="text-center text-2xl text-[#1A202C] font-semibold">
        Создание нового пользователя
      </h2>
      <form action={newUser}>
        <div className="flex flex-col mt-2">
          <label htmlFor="nema">Имя</label>
          <input
            type="text"
            name="name"
            className="px-2 py-1 border-2 border-[#1A202C] rounded-md"
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="email">Почта</label>
          <input
            type="email"
            name="email"
            className="px-2 py-1 border-2 border-[#1A202C] rounded-md"
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="role">Роль</label>
          <select
            name="role"
            id="role"
            className="px-2 py-1 border-2 border-[#1A202C] rounded-md"
            required
            defaultValue={'4'}
          >
            {dataRole.map((role: any) => (
              <option key={role.id} value={`${role.id}`}>
                {role.role}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 font-semibold text-white bg-[#1A202C] rounded-xl"
        >
          Создать пользователя
        </button>
      </form>
    </div>
  )
}
export default NewUser
