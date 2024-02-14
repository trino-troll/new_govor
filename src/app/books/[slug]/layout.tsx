import prisma from '@/app/services/db'

type Props = {
  params: {
    slug: string
  }
} 

export const generateMetadata = async ({params: { slug}}: Props) => {
  const book = await prisma.books.findFirst({where: {slug: slug}})
  if (book) {
    const desc = book.description.slice(0,71) +'...'
    return {
      title: book.name,
      description: desc
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