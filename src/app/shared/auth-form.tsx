'use client'
import Button from "./Button";
import authUserVerify from "./action/auth-user";

const AuthPatriarch = () => {
  const authUser = async (data: FormData) => {
    console.log(data)
    const res = await authUserVerify(data)
    if (res === 'Patriarch') {
      localStorage.setItem('privet', res)
    }
    window.location.reload()
  }

  return (
    <>
      <div>
        <div className="p-4 bg-blue-200">
          <form action={authUser}>
            <input 
              type="text" 
              name="name_1" 
              className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg mb-2 w-full" 
              autoComplete="off"  
            />
            <input 
              type="text" 
              name="name_2" 
              className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg mb-2  w-full"
              autoComplete="off"  
            />
            <input 
              type="text" 
              name="name_3" 
              className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg mb-2  w-full"
              autoComplete="off"  
            />
            <input 
              type="text" 
              name="name_4" 
              className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg mb-2  w-full"
              autoComplete="off"  
            />
            <input 
              type="text" 
              name="name_5" 
              className="border focus:border-2 border-[#1A202C] outline-none px-2 py-1 rounded-lg mb-2 w-full"
              autoComplete="off"  
            />
            <Button type="submit">Отправить</Button>
          </form>
        </div>
      </div>
    </>
  )
}
export default AuthPatriarch;