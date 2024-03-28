import { create } from 'zustand'

interface MainBook {
  name: string
  slug: string | null
  imageUrl: string
}

interface useMainBanner {
  showBanner: boolean
  setShowBanner: (e: boolean) => void
  isDisabledMainBtn: boolean
  setIsDisabledMainBtn: (e: boolean) => void
}

export const useMainBanner = create<useMainBanner>((set) => ({
  showBanner: false,
  setShowBanner: (e) => set(() => ({ showBanner: e })),
  isDisabledMainBtn: true,
  setIsDisabledMainBtn: (e) => set(() => ({ isDisabledMainBtn: e })),
}))

interface useSearchStore {
  textSearch: string
  setTextSearch: (value: string) => void 
  bookSearch: MainBook[]
  setBookSearch: (value: MainBook[]) => void
}

export const useSearch = create<useSearchStore>((set) => ({
  textSearch: '',
  setTextSearch: (value) => set(() => ({textSearch: value})),
  bookSearch: [],
  setBookSearch: (value: MainBook[]) => set(() => ({bookSearch: value}))
}))
