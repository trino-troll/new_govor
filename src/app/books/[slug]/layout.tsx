import prisma from '@/app/services/db'

type Props = {
  params: {
    slug: string
  }
} 

export const generateMetadata = async ({params: { slug}}: Props) => {
  const book = await prisma.books.findFirst({where: {slug: slug}})
  if (book) {
    return {
      title: book.name,
      description: `Слушать аудиокнигу ${book.name}`
    }
  }
}

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
)}