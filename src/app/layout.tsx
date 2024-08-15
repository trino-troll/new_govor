import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './footer/page'
import './globals.css'
import Header from './header/page'
import MainBanner from './shared/banner/main-banner'
import ChatForSite from './shared/chatWithNeiro'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'ChatterBox',
    template: '%s | ChatterBox',
  },
  description: 'Аудиокниги для меня.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${inter.className} bg-black`}>
        <div className="relative min-h-screen max-w-[450px] bg-[#FAFAFA] mx-auto">
          <Header />
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Slide}
          />
          <MainBanner />
          <Footer />
        </div>
        <ChatForSite />
      </body>
    </html>
  )
}
