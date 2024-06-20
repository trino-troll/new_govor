export interface Song {
  title: string
  url: string
  time: string
}
export interface CurrentSong {
  id: number
  name: string
  bookId: number
  audioUrl: string
  progress?: number
  length?: number
}

export interface Book {
  id: number
  name: string
  slug: string
  description: string
  imageUrl: string
  chtecId: number
  authorID: number
  seriesId: number | null
  genreId: number | null
}
export interface AudioFiles {
  id: number
  name: string
  bookId: number
  audioUrl: string
}
