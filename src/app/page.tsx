import Books from './books/page'

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 px-4">
        <Books />
      </div>
    </>
  )
}
