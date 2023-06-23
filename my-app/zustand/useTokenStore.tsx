import { create } from "zustand";
interface UseTokenStore {
  access_token: string | null;
  user_id: string | null;
  logged_in: boolean;
  saveToken: (value: any) => void;
}

export const useTokenStore = create<UseTokenStore>((set) => ({
  access_token: null,
  user_id: null,
  logged_in: false,
  saveToken: (value: { access_token: string; user_id: string }) =>
    set(() => ({
      access_token: value.access_token,
      user_id: value.user_id,
      logged_in: true,
    })),
}));
