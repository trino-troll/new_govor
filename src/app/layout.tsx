import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './header/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatterBox',
  description: 'Аудиокниги для меня. Аудиокниги для тебя. Аудиокниги для всех',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <div className='min-h-screen max-w-[450px] bg-green-200 mx-auto mb-4'>
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
