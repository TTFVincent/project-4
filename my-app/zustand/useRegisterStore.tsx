import { create } from 'zustand'
interface UseRegisterStore {
    showDate: string
  saveDate: (prompt: any) => void
}

export const useRegisterStore = create<UseRegisterStore>((set) => ({
  showDate: "",
  showMonth: "",
  showYear: "",
  saveDate: (prompt: any) => set(() => ({showDate: prompt})),
}))

