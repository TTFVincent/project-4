import { create } from 'zustand'
interface UseTokenStore {
    access_token: string|null
    user_id: number|null
    logged_in: boolean
    saveToken: (value: any) => void
}

export const useTokenStore = create<UseTokenStore>((set) => ({
    access_token: "",
    user_id: null,
    logged_in: false,
  saveToken: (value: any) => set(() => ({access_token: value.access_token, user_id: value.user_id})),
})

)


