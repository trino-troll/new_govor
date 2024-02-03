import { create } from 'zustand'

interface useMainBanner {
  showBanner: boolean,
  setShowBanner: (e: boolean) => void,
}

export const useMainBanner = create<useMainBanner>((set) => ({
  showBanner: false,
  setShowBanner: (e) => set(() => ({ showBanner: e })),
}))