import { create } from 'zustand'
interface UsePromptStore {
  promptList: string
  savePrompt: (prompt: any) => void
}

export const usePromptStore = create<UsePromptStore>((set) => ({
  promptList: "",
  savePrompt: (prompt: any) => set(() => ({promptList: prompt})),
}))

