import Books from './books/page'
import { SearchField } from './shared/search'

export default function Home() {
  return (
    <>
      <SearchField/>
      <Books />
    </>
  )
}
